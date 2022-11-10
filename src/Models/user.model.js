const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique: true,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.privateKey);
  return token;
};

const User = mongoose.model("User", UserSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    mobile: Joi.string().min(10).max(10).required(),
  });

  return schema.validate(user);
}

function validateLogin(user) {
  const schema = Joi.object({
    password: Joi.string().min(3).max(255).required(),
    mobile: Joi.string().min(10).max(10).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
exports.validateLogin = validateLogin;
