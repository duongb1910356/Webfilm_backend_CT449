const FilmService = require("../services/film.service");
const CommentService = require("../services/comment.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.search = async (req, res, next) => {
    let documents = []
    try {
        const filmService = new FilmService(MongoDB.client);
        document = await filmService.search(req.query)
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Có lỗi xảy ra trong khi truy vấn CSDL Films"))
    }
    return res.send(document)
};

exports.getNewFilm = async (req, res, next) => {
    let documents = []
    try {
        const filmService = new FilmService(MongoDB.client);
        documents = await filmService.getNewFilm(req.query);
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Có lỗi xảy ra trong khi truy vấn film mới cập nhật"))
    }
    return res.send(documents)
}

exports.getFilmLe = async (req, res, next) => {
    let documents = []
    try {
        const filmService = new FilmService(MongoDB.client);
        documents = await filmService.getFilmLe(req.query);
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Có lỗi xảy ra trong khi truy vấn film mới cập nhật"))
    }
    return res.send(documents)
}

exports.getFilmBo = async (req, res, next) => {
    let documents = []
    try {
        const filmService = new FilmService(MongoDB.client);
        documents = await filmService.getFilmBo(req.query);
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Có lỗi xảy ra trong khi truy vấn film mới cập nhật"))
    }
    return res.send(documents)
}

exports.getFilmHoatHinh = async (req, res, next) => {
    let documents = []
    try {
        const filmService = new FilmService(MongoDB.client);
        documents = await filmService.getFilmHoatHinh(req.query);
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Có lỗi xảy ra trong khi truy vấn film mới cập nhật"))
    }
    return res.send(documents)
}

exports.getFilFromSlug = async (req, res, next) => {
    let documents = []
    try {
        const filmService = new FilmService(MongoDB.client);
        documents = await filmService.getFilFromSlug(req.params);
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Có lỗi xảy ra trong khi truy vấn film mới cập nhật"))
    }
    return res.send(documents)
}


exports.test = async (req, res, next) => {
    return res.send("Hellu")
};


exports.createComment = async (req, res, next) => {
    let documents = []
    try {
        const commentService = new CommentService(MongoDB.client);
        documents = await commentService.createComment(req.body);
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Có lỗi xảy ra trong khi tạo comment"))
    }
    return res.send(documents)
};

// exports.replyComment = async (req, res, next) => {
//     let documents = []
//     try {
//         const commentService = new CommentService(MongoDB.client);
//         documents = await commentService.replyComment(req.body);
//     } catch (error) {
//         console.log(error)
//         return next(new ApiError(500, "Có lỗi xảy ra trong khi phản hồi comment"))
//     }
//     return res.send(documents)
// };

exports.searchFilm = async (req, res, next) => {
    let documents = []
    try {
        const filmService = new FilmService(MongoDB.client);
        console.log(req);
        documents = await filmService.searchFilm(req.query);
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Có lỗi xảy ra trong khi truy vấn film mới cập nhật"))
    }
    return res.send(documents)
}

