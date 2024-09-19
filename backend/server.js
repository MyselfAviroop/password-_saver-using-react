import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const app = express();
const url = process.env.DATABASE_URL || "mongodb://localhost:27017";
const client = new MongoClient(url);
const port = 3000;
const dbName = "passop";
client.connect();
// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors()); 
// Connect to MongoDB with error handling
client.connect()
  .then(() => {
    console.log("Connected successfully to server");
  })
  .catch(err => {
    console.error("Failed to connect to the database", err);
  });

// GET route to fetch documents
app.get("/", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (err) {
    res.status(500).send("Error fetching documents");
  }
});

app.post("/", async (req, res) => {
  try {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password); // Insert the request body into the collection

    // Extract the inserted ID and send it along with the username
    res.status(201).send({
      success: true,
      result: findResult
    });
  } catch (err) {
    res.status(500).send("Error inserting data");
  }
});

// DELETE route to handle incoming data
app.delete("/", async (req, res) => {
  try {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password); // Delete the request body from the collection
    res.status(200).send({ success: true, result: findResult });  // Respond with the result of the deletion
  } catch (err) {
    res.status(500).send("Error deleting data");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
