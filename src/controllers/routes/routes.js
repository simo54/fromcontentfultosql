const express = require("express");
const router = express.Router();
const dataController = require("../dbController");
const homepage = require("../../../public/frontEndSender"); // this will load our html page on designated path

router.get("/", homepage);
router.get("/posts", dataController.getAllPosts);
router.get("/posts/bestposts", dataController.bestPosts);
router.get("/posts/:id", dataController.certainPost);
router.post("/posts/new", dataController.addPost);
router.put("/posts/update/:id", dataController.updatePost);
router.delete("/posts/delete/:id", dataController.deletePost);

module.exports = router;
