import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/books";
const connectToMongo = () => {
  mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected successfully"))
    .catch((err) => {
      console.error("Connection error:", err);
      setTimeout(connectToMongo, 5000);
    });
};

connectToMongo();
mongoose.Promise = Promise;

const Author = mongoose.model("Author", {
  name: String,
});

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/authors", async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
