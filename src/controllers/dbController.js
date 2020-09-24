const database = require("./db"); // Importing our database credentials

const manageDatabase = {
  // ================ Get all existing posts ================ //
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
        ${username ? `WHERE username LIKE '${username}%'` : ""} ORDER BY id;`
      )
      .then((fetchDb) => res.json(fetchDb.rows))
      .catch((e) => res.sendStatus(404));
  },

  // ================ Add a new post ================ //
  addPost: (req, res) => {
    console.log("Beginning of addPost");
    const { title, username, date, image, tag, rating } = req.body; // We store the values from POST from Postman and we use them to create a new entry as .query SQL method
    if (
      !title ||
      !username ||
      !date ||
      !image ||
      !tag ||
      !rating ||
      title === "" ||
      username === "" ||
      date === "" ||
      image === "" ||
      tag === "" ||
      rating === "" ||
      title === ""
    ) {
      res.sendStatus(400);
      return;
    }
    database
      .query(
        `INSERT INTO "posts" (title, username, date, image, tag, rating) VALUES ('${title}','${username}','${date}','${image}','${tag}','${rating}') RETURNING *;`
      )
      .then((newPost) => res.json(newPost.rows))
      .catch((err) => {
        if (err) res.sendStatus(500);
      });
  },

  // ================ Shows best posts ================ //
  bestPosts: (req, res) => {
    console.log("Beginning of bestPosts");
    // We filter the best posts based on rating 5 or 4
    database
      .query(`SELECT * FROM posts WHERE rating = '5' OR rating = '4' LIMIT 5`)
      .then((filteredBestPosts) => res.json(filteredBestPosts.rows))
      .catch((e) => res.sendStatus(404));
  },

  // ================ Shows post with id filter ================ //
  certainPost: (req, res) => {
    console.log("Beginning of certainPost");
    // We filter the posts based on id input on url
    database
      .query(`SELECT * FROM posts WHERE id = ${req.params.id}`)
      .then((filteredPosts) => res.json(filteredPosts.rows))
      .catch((e) => res.sendStatus(404));
  },

  // ================ Update title and username ================ //
  updatePost: (req, res) => {
    console.log("Beginning of updatePost");
    const { id } = req.params;
    const { title, username } = req.body;
    database
      .query(
        `UPDATE posts
      SET title='${title}', username='${username}'
      WHERE id=${id}
      RETURNING *`
      )
      .then((updatedPost) => res.json(updatedPost.rows))
      .catch((err) => res.sendStatus(500));
  },

  // ================ Delete post by id input ================ //
  deletePost: (req, res) => {
    console.log("Beginning of deletePost");
    const { id } = req.params;
    database
      .query(`DELETE FROM posts WHERE id=${id}`)
      .then((deletedPost) => res.json(deletedPost.rows))
      .catch((e) => res.sendStatus(500));
  },
};

module.exports = manageDatabase;
