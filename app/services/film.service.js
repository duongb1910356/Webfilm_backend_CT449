const {ObjectId} = require("mongodb");

class FilmService{
    constructor(client){
        this.Film = client.db().collection("film");
    }

    extactFieldSearch(url_query){
        const condition = {
            name: url_query.name,
            country: url_query.country,
            category: url_query.category,
            page: url_query.page
        }

        //Xoá các trường tìm kiếm rỗng
        Object.keys(condition).forEach(
            (key) => condition[key] === undefined && delete condition[key]
        )

        return condition;
    }

    async find(filter) {
        const cursor = await this.Film.find(filter);
        return await cursor.toArray();
    }

    async search(query){
        const condition = this.extactFieldSearch(query);
        const statement = {}
        for (let field in condition){
            statement[field] = condition[field]
        }
        console.log(statement)
        return this.find(statement)
    }
}

module.exports = FilmService;