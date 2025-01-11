require('dotenv').config(); // Load environment variables

const express = require('express');
const app = express();
var cors = require('cors');
const { MongoClient } = require('mongodb');

// Get MongoDB URI from .env
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");

        // Select the database (it will be created once we insert data)
        const database = client.db("InnSightDB"); 
        console.log("Database selected:", database.databaseName);
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    } finally {
        await client.close();
    }
}

connectToDatabase(); // Start the connection

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
