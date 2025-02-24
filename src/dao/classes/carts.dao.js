import cartsModel from "../models/carts.model.js";
import { daoError } from "../../utils/errorsHandler.js";

export default class Cart {
  getAll = async () => {
    try {
      const carts = await cartsModel.find();
      return carts;
    } catch (e) {
      throw new daoError("Fail getting all the carts");
    }
  };

  getById = async (id) => {
    try {
      const cart = await cartsModel.findOne({ _id: id });
      return cart;
    } catch (e) {
      throw new daoError("Fail getting cart by id");
    }
  };

  getByIdPopulate = async (id) => {
    try {
      const cart = await cartsModel
        .findOne({ _id: id })
        .populate("products.product");
      return cart;
    } catch (e) {
      throw new daoError("Fail getting cart by id");
    }
  };

  create = async (cart) => {
    try {
      const newCart = await cartsModel.create(cart);
      return newCart;
    } catch (e) {
      throw new daoError("Fail creating cart");
    }
  };

  update = async (id, newData) => {
    try {
      const result = await cartsModel.updateOne({ _id: id }, { $set: newData });
      return result;
    } catch (e) {
      throw new daoError("Fail updating product");
    }
  };

  delete = async (id) => {
    try {
      const result = await cartsModel.deleteOne({ _id: id });
      return result;
    } catch (e) {
      throw new daoError("Fail deleting product");
    }
  };
}
