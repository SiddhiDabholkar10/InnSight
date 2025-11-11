const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
require("dotenv").config();
const app = express();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const uploadsDir = path.join(__dirname, "uploads");

fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(uploadsDir));

const bcryptSalt = bcrypt.genSaltSync(10);

const jwtSecret = process.env.jwtSECRET;

//parses jsion body and put it in req.body
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

// --- Upload by Photos With Link ---
app.post("/upload-by-link", async (req, res) => {
  try {
    // Extract the 'link' property from the request body
    const link = req.body.link;
    // Basic validation: ensure 'link' exists and is a string
    if (!link || typeof link !== "string") {
      return res.status(400).json({ error: "Valid 'link' string is required" });
    }

    // Create a unique file name using the current timestamp
    const newName = "photo-" + Date.now() + ".jpg";
    const dest = path.join(__dirname, "uploads", newName);

    // Download and save the image from the provided link into the 'uploads' folder
    // image-downloader automatically fetches the file from the URL
    await imageDownloader.image({ url: link.trim(), dest }); // image-downloader needs a string
    console.log({ newName, dest });
    // Respond to the client with the file path
    res.json(newName);
    console.log("Image downloaded and saved to", dest);
  } catch (err) {
    // If an error occurs (e.g., invalid URL, download failure),
    // catch it here and send a 500 response to the client
    console.error("upload-by-link error:", err);
    res
      .status(500)
      .json({ error: "download failed", details: String(err.message || err) });
  }
});

// --- Upload Photos from device ---
const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", "")); // Store only the filename, not the full path
  }
  res.json(uploadedFiles);
});

// --- Add New Accommodations ---
app.post("/addAccomodations", (req, res) => {
  const { token } = req.cookies;
  const {owner, title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests} = req.body; 
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const Placedoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests
    });
    res.json(Placedoc);
  });
});

// --- Start the server ---

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
