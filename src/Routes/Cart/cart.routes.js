const express = require("express");
const auth = require("../../Middleware/auth.middleware");
const cartService = require("../../Service/cart.service");
const router = express.Router();
const { Cart, validateCart } = require("../../Models/cart.model");

router.get("/", auth, async (req, res) => {
  const AllItems = await cartService.findAllCart({ User: req.user._id });
  res.status(200).send(AllItems);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCart(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const isExist = await cartService.findCart({ User: req.user._id, itemId: req.body.itemId });
  if (isExist) {
    const cart = await cartService.updateCart({ User: req.user._id }, { quantity: isExist.quantity + req.body.quantity });
    res.send(cart);
  } else {
    const cart = await cartService.postCart({ ...req.body, User: req.user._id });
    console.log(cart);
    res.send(cart);
  }
});

router.put("/", auth, async (req, res) => {
  const { error } = validateCart(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const isExist = await cartService.findCart({ User: req.user._id, itemId: req.body.itemId });
  if (isExist) {
    const cart = await cartService.updateCart({ User: req.user._id }, { quantity: req.body.quantity });
    res.send(cart);
  } else {
    res.send({ status: false, message: "No Such Items in Your Cart To Update" });
  }
});

router.delete("/", auth, async (req, res) => {
  if (!req.body.itemId) {
    res.status(400).send({ status: false, message: "Please Give ItemID" });
  } else {
    const cartSingleton = await cartService.findCart({ User: req.user._id, itemId: req.body.itemId });
    if (cartSingleton) {
      const resp = await cartService.deleteCart(cartSingleton._id);
      res.status(200).send(resp);
    } else {
      res.status(400).send({ status: false, message: "No Such Item in Cart" });
    }
  }
});

module.exports = router;
