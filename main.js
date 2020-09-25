require("dotenv").config(); // Requirement for hiding sensible data from db
const express = require("express");
const bodyParser = require("body-parser");
const postRoute = require("./src/controllers/routes/routes");
const app = express();
const port = 5000;
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middlewares to format json response
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing our addresses from a router file
app.use("/", postRoute);

app.listen(port, () => console.log("Server running on " + port));
