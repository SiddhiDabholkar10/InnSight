const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const mime = require('mime-types');
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const uploadsDir = path.join(__dirname, "uploads");



require("dotenv").config();
const app = express();

app.use('/uploads', express.static(__dirname+'/uploads')); //no need to serve uploads locally now




const bcryptSalt = bcrypt.genSaltSync(10);

const jwtSecret = process.env.jwtSECRET;
const bucket = 'innsight-app-bucket';

//parses json body and put it in req.body
app.use(express.json());

//parses cookie and put it in req.cookies
app.use(cookieParser());
// Allow the frontend (Vite default: http://localhost:5173) to call this API and send cookies
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split('.');
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + '.' + ext;
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body: fs.readFileSync(path),
    Key: newFilename,
    ContentType: mimetype,
    ACL: 'public-read',
  }));
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

// --- Database connection ---
mongoose.connect(process.env.MONGO_URL);
// --- Health check route (quick test) ---
app.get("/test", (req, res) => {
  res.json("test ok");
});
// --- Register a new user ---

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt), // Hash the password before storing
    });
    res.json(userDoc); // Return the created user document
  } catch (e) {
    res.status(422).json(e);
  }
});

// --- Login ---
// Expects JSON body: { email, password }
// If OK: creates a JWT and sends it back as an HTTP cookie named "token"
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
          name: userDoc.name,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

// --- Get current profile ---
// Reads JWT from cookie, verifies it, then returns basic user info
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);

      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});
// --- Logout ---
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true); // Clear the cookie by setting it to an empty string
});


// --- Upload Photo by Link ---

app.post('/upload-by-link', async (req,res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link, 
    dest: '/photostmp/' +newName,
  });
  const url = await uploadToS3('/photostmp/' +newName, newName, mime.lookup('/photostmp/' +newName));
 
  res.json(url);
});


// --- Upload Photos from device ---
const photosMiddleware = multer({dest:'/photostmp'});

app.post("/upload", photosMiddleware.array("photos", 100),async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname,mimetype } = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
   
    
  }
  res.json(uploadedFiles);
});

// --- Add New Accommodations ---
app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const photosArray = photos || addedPhotos || []; 
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const Placedoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: photosArray,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(Placedoc);
  });
});

// --- Get List of User's Accommodations ---

app.get("/user-places", (req, res) => {
  //Grabbing user id
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});


app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

//Get details of a specific place by id
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

// --- Update Existing Accommodation ---
app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photos,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const photosArray = photos || addedPhotos || []; 
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: photosArray,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

// --- Start the server ---

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
