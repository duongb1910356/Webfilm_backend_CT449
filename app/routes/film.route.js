const express = require("express");
const films = require("../controller/film.controller");

const router = express.Router();

router.route("/search")
    .get(films.search)

module.exports = router;