const express = require("express");
const comment = require("../controller/comment.controller");
const auth = require("../controller/auth.controller");

const router = express.Router();

router.route("/create/:slug?")
    .post(comment.createComment)

router.route("/reply/:slug?/:id?")
    .post(comment.replyComment);

router.route("/post/:slug?")
    .get(comment.getPost);

module.exports = router;