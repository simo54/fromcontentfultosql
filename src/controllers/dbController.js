const database = require("./db");

const manageDatabase = {
  getAllPosts: (req, res) => {
    console.log("Beginning of getAllPosts");
    database
      .query("SELECT * FROM posts;")
      .then((fetchDb) => res.json(fetchDb.rows)) //
      .catch((e) => res.sendStatus(404));
  },
  addPost: (req, res) => {
    console.log("Beginning of addPost");
    const { title, username, date, image, tag, rating } = req.body;
    database
      .query(
        `INSERT INTO "posts" (title, username, date, image, tag, rating) VALUES ('${title}','${username}','${date}','${image}','${tag}','${rating}') RETURNING *;`
      )
      .then((newPost) => res.json(newPost.rows))
      .catch((err) => {
        if (err) res.sendStatus(500);
      });
  },
  bestPosts: (req, res) => {
    console.log("Beginning of bestPosts");
    database
      .query(`SELECT * FROM posts WHERE rating = '5' OR rating = '4' LIMIT 5`)
      .then((filteredPosts) => res.json(filteredPosts.rows))
      .catch((e) => res.sendStatus(404));
  },
  certainPost: (req, res) => {
    console.log("Beginning of certainPost");
    database
      .query(`SELECT * FROM posts WHERE id = ${req.params.id}`)
      .then((filteredPosts) => res.json(filteredPosts.rows))
      .catch((e) => res.sendStatus(404));
  },
};

module.exports = manageDatabase;
