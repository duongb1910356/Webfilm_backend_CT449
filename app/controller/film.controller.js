const FilmService = require("../services/film.service");
const CommentService = require("../services/comment.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");

exports.search = async (req, res, next) => {
  let documents = [];
  try {
    const filmService = new FilmService(MongoDB.client);
    document = await filmService.search(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "Có lỗi xảy ra trong khi truy vấn CSDL Films")
    );
  }
  return res.send(document);
};

exports.getNewFilm = async (req, res, next) => {
  let documents = [];
  try {
    const filmService = new FilmService(MongoDB.client);
    documents = await filmService.getNewFilm(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "Có lỗi xảy ra trong khi truy vấn film mới cập nhật")
    );
  }
  return res.send(documents);
};

exports.getFilmLe = async (req, res, next) => {
  let documents = [];
  try {
    const filmService = new FilmService(MongoDB.client);
    documents = await filmService.getFilmLe(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "Có lỗi xảy ra trong khi truy vấn film mới cập nhật")
    );
  }
  return res.send(documents);
};

exports.getFilmBo = async (req, res, next) => {
  let documents = [];
  try {
    const filmService = new FilmService(MongoDB.client);
    documents = await filmService.getFilmBo(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "Có lỗi xảy ra trong khi truy vấn film mới cập nhật")
    );
  }
  return res.send(documents);
};

exports.getFilmHoatHinh = async (req, res, next) => {
  let documents = [];
  try {
    const filmService = new FilmService(MongoDB.client);
    documents = await filmService.getFilmHoatHinh(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "Có lỗi xảy ra trong khi truy vấn film mới cập nhật")
    );
  }
  return res.send(documents);
};

exports.getFilFromSlug = async (req, res, next) => {
  let documents = [];
  try {
    const filmService = new FilmService(MongoDB.client);
    documents = await filmService.getFilFromSlug(req.params);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "Có lỗi xảy ra trong khi truy vấn film mới cập nhật")
    );
  }
  return res.send(documents);
};

exports.test = async (req, res, next) => {
  return res.send("Hellu");
};

exports.createComment = async (req, res, next) => {
  let documents = [];
  try {
    const commentService = new CommentService(MongoDB.client);
    documents = await commentService.createComment(req.body);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Có lỗi xảy ra trong khi tạo comment"));
  }
  return res.send(documents);
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
  let documents = [];
  try {
    const filmService = new FilmService(MongoDB.client);
    console.log(req);
    documents = await filmService.searchFilm(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "Có lỗi xảy ra trong khi truy vấn film mới cập nhật")
    );
  }
  return res.send(documents);
};

exports.addFavourite = async (req, res, next) => {
  try {
    const { userId, filmId } = req.body; // Lấy userId và filmId từ request body
    const user = await MongoDB.client
      .db("films")
      .collection("user")
      .findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $push: { favourite: filmId } },
        { returnOriginal: false }
      );

    return res
      .status(200)
      .json({ message: "Thêm phim vào danh sách yêu thích thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi thêm film yêu thích" });
  }
};

exports.addHistory = async (req, res, next) => {
  try {
    const { userId, filmId } = req.body; // Lấy userId và filmId từ request body
    const user = await MongoDB.client
      .db("films")
      .collection("user")
      .findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $push: { history: filmId } },
        { returnOriginal: false }
      );

    return res
      .status(200)
      .json({ message: "Thêm phim vào lịch sử thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi thêm film vào lịch sử" });
  }
};

exports.deleteFavourite = async (req, res, next) => {
  try {
    const { userId, filmId } = req.body; // Lấy userId và filmId từ request body
    const user = await MongoDB.client
      .db("films")
      .collection("user")
      .findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $pull: { favourite: filmId } },
        { returnOriginal: false }
      );
    console.log("da xoa film >> ", filmId);

    return res
      .status(200)
      .json({ message: "Xoá phim khỏi danh sách yêu thích thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi xoá film yêu thích" });
  }
};

exports.getFavourite = async (req, res, next) => {
  let documents = [];
  try {
    const { userId } = req.params; // Lấy userId và filmId từ request body
    const filmService = new FilmService(MongoDB.client);
    console.log("req >> ", userId);
    documents = await filmService.getFavoriteFilmsByUser(userId);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi thêm film yêu thích" });
  }
  return res.send(documents);
};

exports.getHistory = async (req, res, next) => {
  let documents = [];
  try {
    const { userId } = req.params; // Lấy userId và filmId từ request body
    const filmService = new FilmService(MongoDB.client);
    documents = await filmService.getHistoryFilmsByUser(userId);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi thêm film vào lịch sử" });
  }
  return res.send(documents);
};

exports.checkFavourite = async (req, res, next) => {
  // let documents = [];
  try {
    const { userId, filmId } = req.query; // Lấy userId và filmId từ request body
    const filmService = new FilmService(MongoDB.client);
    const isFavorite = await filmService.checkFavoriteFilms(userId, filmId);
    return res.send({ isFavorite });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi kiểm tra film yêu thích" });
  }
};
