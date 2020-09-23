const database = require("./db"); // Importing our database credentials

const manageDatabase = {
  getAllPosts: (req, res) => {
    console.log("Beginning of getAllPosts");
    const title = req.query.title; // store value from title /posts?title=VALUE/
    const username = req.query.username; // store value from username /posts?username=VALUE/
    const tag = req.query.tag; // store value from tag /posts?tag=VALUE/
    // With every new refresh the .query will check which query has been utilised and then, will give back the results. If no query has been input, will give back the full list of posts from our database
    database
      .query(
        `SELECT * FROM posts 
        ${tag ? `WHERE tag LIKE '${tag}%'` : ""} 
        ${title ? `WHERE title LIKE '${title}%'` : ""} 
        ${username ? `WHERE username LIKE '${username}%'` : ""};`
      )
      .then((fetchDb) => res.json(fetchDb.rows)) //
      .catch((e) => res.sendStatus(404));
  },
  addPost: (req, res) => {
    console.log("Beginning of addPost");
    const { title, username, date, image, tag, rating } = req.body; // We store the values from POST from Postman and we use them to create a new entry as .query SQL method
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
    // We filter the best posts based on rating 5 or 4
    database
      .query(`SELECT * FROM posts WHERE rating = '5' OR rating = '4' LIMIT 5`)
      .then((filteredPosts) => res.json(filteredPosts.rows))
      .catch((e) => res.sendStatus(404));
  },
  certainPost: (req, res) => {
    console.log("Beginning of certainPost");
    // We filter the posts based on id input on url
    database
      .query(`SELECT * FROM posts WHERE id = ${req.params.id}`)
      .then((filteredPosts) => res.json(filteredPosts.rows))
      .catch((e) => res.sendStatus(404));
  },
};

module.exports = manageDatabase;
