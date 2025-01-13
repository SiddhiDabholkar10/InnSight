require('dotenv').config(); // Load environment variables

const express = require('express');
const app = express();
var cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const bcryptSalt = bcrypt.genSaltSync(10);
const User = require('./models/User');

// Get MongoDB URI from .env
const uri = process.env.MONGO_URL;
//const client = new MongoClient(uri);


app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));


// Connect to MongoDB and log success
mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB database successfully!");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });


app.get('/test', (req, res) => {
    res.json('test ok');
});


app.post('/register', async (req,res)=>{
    const {name,email,password} = req.body;
    const userDoc  = await  User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
})

app.listen(4000, () => { 
    console.log("Server is running on port 4000");
}); 
