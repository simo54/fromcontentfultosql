require("dotenv").config(); // Requirement for hiding sensible data from db
const express = require("express");
const bodyParser = require("body-parser");
const manageDatabase = require("./src/controllers/dbController");
const app = express();
const port = 3000;
const homepage = require("./public/frontEndSender"); // this will load our html page on designated path

// Middlewares to format json response
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", homepage); // Getting the html file displaying a "Homepage" simulation
app.get("/posts", manageDatabase.getAllPosts); // Get all entries on our elephant database. A filter of results can be done as following: "/posts?title=xyz"
app.get("/posts/:id", manageDatabase.certainPost); // Filter the results based on the id input from url
app.get("/bestposts", manageDatabase.bestPosts); // Get the 5 best posts based on rating value 5 and 4
app.post("/newpost", manageDatabase.addPost); // Accessible on Postman to create a new entry === NOTE, the entry will be stored in our SQL Elephant database

app.listen(port, () => console.log("Server running on " + port));
