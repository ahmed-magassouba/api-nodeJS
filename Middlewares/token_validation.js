const jwt = require("jsonwebtoken");
const { error } = require("../helper.js");

checkToken = (req, res, next) => {
  // let token = req.get("authorization");
  // console.log(token.slice(7));
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            status: 401,
            message: "Token invalide...",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        status: 401,
        message: "Accès refusé! Pas de token...",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { checkToken };
