const express = require("express");
const auth = require("../../Middleware/auth.middleware");
const router = express.Router();
const { User, validate, validateLogin } = require("../../Models/user.model");
const bcrypt = require("bcrypt");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/signup", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    mobile: req.body.mobile,
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    mobile: user.mobile,
    email: user.email,
  });
});

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ mobile: req.body.mobile });
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (err) {
        res.send(err);
      }
      if (result) {
        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send({ success: true, message: "login successful" });
      } else {
        res.send({ success: false, message: "passwords do not match" });
      }
    });
  } else {
    res.status(400).send({ success: false, message: "user not exist" });
  }
});

module.exports = router;
