const FilmService = require("../services/film.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const UserService = require ("../services/user.service")
const jwt = require("jsonwebtoken");
const config = require("../config/index");

exports.test = async (req, res, next) => {
    return res.send("Hellu")
};

exports.registerAccount = async (req, res, next) => {
    let document = [];
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(400, "Lỗi đăng ký người dùng")
        );
    }
};


exports.checkLogin = async (req, res, next) => {
    // const token - jwt.sign()
    let document = null;
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.checkLogin(req.body, res);
        // return res.send(document);
        if(document != false){
            return res.send(document);
        }else{
            return res.send(false)
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(400, "Lỗi đăng nhập")
        );
    }
};

exports.verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.send("Vui lòng đăng nhập");
    
    try {
        const checkToken = jwt.verify(token, config.secret.SECRET_TOKEN);
        // req.user = checkToken;
        // return res.send(true);
        // console.log(next())
        // res.redirect('back')
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(400, "Token khong hop le")
        );
    }
}
