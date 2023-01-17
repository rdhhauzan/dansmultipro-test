const { comparePassword } = require("../helpers/bcrypt");
const axios = require("axios");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class Controller {
  static async userLogin(req, res) {
    let { username, password } = req.body;
    // console.log(req.body);
    try {
      let findUser = await User.findOne({
        where: {
          username: username,
        },
      });
      if (!findUser) {
        throw { name: "USER_NOT_FOUND" };
      }

      let validatePassword = comparePassword(password, findUser.password);
      if (!validatePassword) {
        throw { name: "USER_NOT_FOUND" };
      }

      const payload = {
        id: findUser.id,
        username: findUser.username,
      };

      const access_token = createToken(payload);
      res.status(200).json({
        access_token: access_token,
        id: findUser.id,
        username: findUser.username,
      });
    } catch (error) {
      if (error.name === "USER_NOT_FOUND") {
        res.status(401).json({
          message: "Invalid username/password",
        });
      }
    }
  }

  static async userRegister(req, res) {
    let { username, password, name } = req.body;
    // console.log(req.body);
    try {
      if (!username || !password) {
        throw { name: "FIELD_UNCOMPLETE" };
      }
      let data = await User.create({
        username: username,
        password: password,
        name: name,
      });

      res.status(201).json({
        id: data.id,
        username: data.username,
        name: data.name,
      });
    } catch (error) {
      console.log(error);
      if (error.name == "FIELD_UNCOMPLETE") {
        res.status(401).json("Please Fill all the Fields!");
      }
    }
  }
}

module.exports = Controller;
