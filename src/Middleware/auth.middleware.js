const jwt = require("jsonwebtoken");
const { User } = require("../Models/user.model");
const auth = async (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, process.env.privateKey);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      throw "myException";
    }
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
module.exports = auth;
