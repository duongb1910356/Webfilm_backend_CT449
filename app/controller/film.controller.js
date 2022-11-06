const FilmService = require("../services/film.service");
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