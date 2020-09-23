require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const manageDatabase = require("./src/controllers/dbController");
const homepage = require("./public/frontEndSender");
const app = express();
const port = 3000;

// Middlewares to format json response
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", homepage); // Getting the html   çfile displaying a "Homepage"
app.get("/posts", manageDatabase.getAllPosts);
app.get("/posts", async function (req, res) {
  let title = req.query.title;
  console.log(title);

  let articles = await manageDatabase({ title: title }).exec();

  // Return the articles to the rendering engine
  res.render("index", {
    articles: articles,
  });
});
app.get("/bestposts", manageDatabase.bestPosts); // Get the 5 best posts based on rating value
app.get("/posts/:id", manageDatabase.certainPost);
app.post("/newpost", manageDatabase.addPost);

app.listen(port, () => console.log("Server running on " + port));
