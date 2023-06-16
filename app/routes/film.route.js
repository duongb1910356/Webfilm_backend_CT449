const express = require("express");
const films = require("../controller/film.controller");
const auth = require("../controller/auth.controller");

const router = express.Router();

router.route("/search").get(films.search);

router.route("/film-new-update").get(films.getNewFilm);

router.route("/film-le").get(films.getFilmLe);

router.route("/film-bo").get(films.getFilmBo);

router.route("/film-hoat-hinh").get(films.getFilmHoatHinh);

router.route("/film/:slug").get(films.getFilFromSlug);

router.route("/film-search").get(films.searchFilm);

router.route("/add-favourite").post(films.addFavourite);

router.route("/add-history").post(films.addHistory);

router.route("/delete-favourite").patch(films.deleteFavourite);

router.route("/get-favourite/:userId").get(films.getFavourite);

router.route("/get-history/:userId").get(films.getHistory);

router.route("/check-favourite").get(films.checkFavourite);

// router.route("/comment")
//     .post(films.createComment)

// router.route("/comment/reply")
//     .post(films.replyComment)

module.exports = router;
