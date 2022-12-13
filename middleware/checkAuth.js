const jwt = require("jsonwebtoken");

const config = require("../config/db.config.js");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({message:"A token is required for authentication"});
  }
  try {
    // console.log("---------"+config.JWT_SECRET);
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({message:"Invalid Token"+err});
  }
  return next();
};

module.exports = verifyToken;