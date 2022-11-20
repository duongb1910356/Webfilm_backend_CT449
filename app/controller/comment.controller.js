const FilmService = require("../services/film.service");
const CommentService = require("../services/comment.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const loginHelper = require("../helper/login.helper");
const { ObjectId } = require("mongodb");


exports.createComment = async (req, res, next) => {
    const check = await loginHelper(req, res, next);
    if (check == true) {
        let comment = {
            "_id": ObjectId(),
            "author": req.body.author,
            "email": req.body.email,
            "content": req.body.content,
            "date": req.body.date,
        }
        // console.log(req.params.slug);
        let document = await MongoDB.client.db().collection("post").findOneAndUpdate(
            {
                "slug": req.params.slug
            },
            {
                $push: { "comment": comment },
            },
            { returnDocument: "after", upsert: true }
        )
        return res.send(true)
    }else{
        return res.send("Vui lòng đăng nhập")
    }
};

exports.replyComment = async (req, res, next) => {
    const check = loginHelper(req, res, next);
    if (check == true) {
        let comment = {
            "_id": ObjectId(),
            "author": req.body.author,
            "email": req.body.email,
            "content": req.body.content,
            "toAuthor": req.body.toAuthor,
        };

        let document = await MongoDB.client.db().collection("post").findOneAndUpdate(
            {
                "slug": req.params.slug,
                "comment._id": ObjectId(req.params.id)
            },
            {
                $push: { "comment.$.reply": comment },
            },
        )
        res.send(true);
    }else{
        return res.send("Vui lòng đăng nhập");
    }

};

exports.getPost = async (req, res, next) => {
    const document = await MongoDB.client.db().collection("post").findOne(
        {
            "slug": req.params.slug,
        }
    );
    if (document) {
        const data = document.comment;
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log(data)
        return res.send(data);
    }
    console.log("null")
    return res.send(null);

};
