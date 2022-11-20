const { ObjectId } = require("mongodb");

class CommentService {
    constructor(client) {
        this.Comment = client.db().collection("po");
    }

    extactField(url_query) {
        const condition = {
            author: url_query.author,
            email: url_query.email,
            content: url_query.content,
        }

        //Xoá các trường tìm kiếm rỗng
        Object.keys(condition).forEach(
            (key) => condition[key] === undefined && delete condition[key]
        )

        return condition;
    }

    prepareStatement(query) {
        const condition = this.extactFieldSearch(query);
        const statement = {};
        for (let field in condition) {
            statement[field] = condition[field]
        };
        return statement;
    }

    // async createComment(payload) {
    //     const comment = await this.extactField(payload);
    //     const result = await this.Comment.findOneAndUpdate(
    //         comment,
    //         { $set: { "reply": "" } },
    //         { returnDocument: "after", upsert: true }
    //     );
    //     return result.value;
    // }

    // async replyComment(payload) {
    //     const comment = await this.extactField(payload);
    //     console.log(comment)
    //     const collection = await this.Comment.find({
    //         "reply._id" : 456
    //     }).toArray()

    //     return collection;
    // }

}

module.exports = CommentService;