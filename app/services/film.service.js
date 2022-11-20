const {ObjectId} = require("mongodb");

class FilmService{
    constructor(client){
        this.Film = client.db().collection("film");
    }

    extactFieldSearch(url_query){
        const condition = {
            name: new RegExp(url_query.name, 'i'),
            country: url_query.country,
            category: url_query.category,
            slug: url_query.slug,
        }

        //Xoá các trường tìm kiếm rỗng
        Object.keys(condition).forEach(
            (key) => condition[key] === undefined && delete condition[key]
        )

        return condition;
    }

    prepareStatement(query){
        const condition = this.extactFieldSearch(query);
        const statement = {};
        for (let field in condition){
            statement[field] = condition[field]
        };
        return statement;
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
        return this.find(statement)
    }

    async getNewFilm(query){
        let statement = this.prepareStatement(query);
        return await this.Film.find(statement).sort({"modified" : -1}).toArray();
    }

    async getFilmLe(query){
        let statement = this.prepareStatement(query);
        statement["type"] = "single";
        return await this.Film.find(statement).toArray();
    }

    async getFilmBo(query){
        let statement = this.prepareStatement(query);
        statement["type"] = "series";
        return await this.Film.find(statement).toArray();
    }

    async getFilmHoatHinh(query){
        let statement = this.prepareStatement(query);
        statement["type"] = "hoathinh";
        return await this.Film.find(statement).toArray();
    }

    async getFilFromSlug(query){
        let statement = this.prepareStatement(query);
        console.log(statement);
        // return await this.Film.find(statement).toArray();

        return await this.Film.findOne(statement)
    }

    async searchFilm(query){
        let statement = this.prepareStatement(query);
        let document = [];
        try {
            document = await this.Film.find(statement).toArray();
            return document;
        } catch (error) {
            return [];
        }
    }
}

module.exports = FilmService;