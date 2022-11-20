const express = require("express");
const auth = require("../controller/auth.controller");

const router = express.Router();

router.route("/")
    .get(auth.test)

router.route("/register")
    .post(auth.registerAccount)

router.route("/login")
    .post(auth.checkLogin)

router.route("/verifytoken")
    .post(auth.verifyToken)


    
module.exports = router;