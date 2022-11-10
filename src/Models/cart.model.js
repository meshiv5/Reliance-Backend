const mongoose = require("mongoose");
const Joi = require("joi");
const CartSchema = mongoose.Schema({
  itemId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 9999999,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Cart = mongoose.model("cart", CartSchema);

function validateCart(cart) {
  const schema = Joi.object({
    itemId: Joi.number().required(),
    quantity: Joi.number().min(1).max(9999999).required(),
  });

  return schema.validate(cart);
}

module.exports = {
  Cart,
  validateCart,
};
