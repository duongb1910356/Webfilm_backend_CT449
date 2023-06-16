// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//     userName: { require: true, type: String },
//     password: { require: true, type: String},
// })

// module.exports = mongoose.model('user',userSchema)
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const config = require("../config/index");

class UserService {
  constructor(client) {
    this.User = client.db().collection("user");
  }

  async hashPass(rawpass) {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(rawpass, salt);
    return hashPass;
  }

  async extactFieldSearch(url_query) {
    const hashPass = await this.hashPass(url_query.password);
    const condition = {
      username: url_query.username,
      email: url_query.email,
      password: hashPass,
      role: "USER",
      favourite: [{}],
    };

    //Xoá các trường tìm kiếm rỗng
    Object.keys(condition).forEach(
      (key) => condition[key] === undefined && delete condition[key]
    );
    return condition;
  }

  async create(payload) {
    console.log("payload >> ", payload);
    const user = await this.extactFieldSearch(payload);
    const findUser = await this.User.findOne({ email: user.email });
    if (!findUser) {
      const result = await this.User.findOneAndUpdate(
        user,
        { $set: user },
        { returnDocument: "after", upsert: true }
      );
      return result.value;
    }
    return false;
  }

  async checkLogin(payload, res) {
    const userLogin = await this.User.findOne(
      { email: payload.email },
      { returnDocument: "after" }
    );

    if (userLogin) {
      const passwordLogin = await bcrypt.compare(
        payload.password,
        userLogin.password
      );

      if (passwordLogin == true) {
        const token = jwt.sign(
          { _id: userLogin._id },
          config.secret.SECRET_TOKEN
        );
        res.header("auth-token", token);
        return userLogin;
      }
    }
    return false;
  }
}

module.exports = UserService;
