const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../models/User");
const util = require("util");
module.exports = {
  isAuthenticated: async (req, res, next) => {
    const token = req.headers["x-access-token"] || req.query.token;
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "not logged in",
      });
    }
    new Promise((resolve, reject) => {
      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    })
      .then((decoded) => {
        res.locals.user = decoded;
        User.findOne({ _id: decoded.id }, (err, result) => {
          if (!result) {
            res.status(403).json({
              success: false,
              message: "User Not Found",
            });
          } else {
            next();
          }
        });
      })
      .catch((error) => {
        res.status(403).json({
          success: false,
          message: error.message,
        });
      });

    // const findUser = await User.findOne({_id:req.decoded.id})
    // console.log(findUser)
  },
};
