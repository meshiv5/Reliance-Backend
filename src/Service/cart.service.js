const { Cart } = require("../Models/cart.model");
const logger = require("../Logger/api.logger");

class CartService {
  constructor() {}

  async getCart() {
    const tasks = await Cart.find({});
    console.log("tasks:::", tasks);
    return tasks;
  }
  async findCart(query) {
    const cart = await Cart.findOne(query);
    if (cart) {
      return cart;
    } else return null;
  }
  async findAllCart(query) {
    const cart = await Cart.find(query);
    if (cart) {
      return cart;
    } else return [];
  }
  async postCart(item) {
    let data = {};
    try {
      data = await Cart.create(item);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async updateCart(item, updatedData) {
    let data = {};
    try {
      data = await Cart.findOneAndUpdate(item, updatedData, { new: true });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async deleteCart(id) {
    let data = {};
    try {
      data = await Cart.deleteOne({ _id: id });
    } catch (err) {
      logger.error("Error::" + err);
    }
    const state = data.deletedCount > 0 ? true : false;
    return { status: state, message: state ? "Deleted Succesfully" : "Failed To Delete" };
  }
}

module.exports = new CartService();
