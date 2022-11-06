const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();
const filmsRouter = require("./app/routes/film.route");

app.use(cors());
app.use(express.json());
app.use("/api/films", filmsRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Không tìm thấy trang yêu cầu"));
})

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Lỗi server film",
    });
});

module.exports = app;