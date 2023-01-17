const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    console.log(req.headers);
    if (!access_token) {
      throw { name: "INVALID_ACCESS" };
    }

    const validateToken = verifyToken(access_token);
    if (!validateToken) {
      throw { name: "INVALID_ACCESS" };
    }

    const getUser = await User.findByPk(validateToken.id);
    if (!getUser) {
      throw { name: "INVALID_ACCESS" };
    }

    req.user = {
      id: validateToken.id,
      username: validateToken.username,
    };
    next();
  } catch (error) {
    console.log(error);
    if (error.name === "INVALID_ACCESS") {
      res.status(401).json({
        message: "Invalid token",
      });
    }
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({
        message: "Invalid token",
      });
    }
  }
};

module.exports = authentication;
