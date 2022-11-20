const jwt = require("jsonwebtoken");
const config = require("../config/index");

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    // if(!token) return res.send("Vui lòng đăng nhập");
    try {
        const checkToken = jwt.verify(token, config.secret.SECRET_TOKEN);
        // req.user = checkToken;
        return true;
        // console.log(next())
        // res.redirect('back')
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = verifyToken;