import productsModel from "../models/products.model.js";
import { daoError } from "../../utils/errorsHandler.js";

export default class Product {
  getAll = async () => {
    try {
      const products = await productsModel.find();
      return products;
    } catch (e) {
      throw new daoError("Fail getting all the products");
    }
  };

  getById = async (id) => {
    try {
      const product = await productsModel.findOne({ _id: id });
      return product;
    } catch (e) {
      throw new daoError("Fail getting product by id");
    }
  };

  getByCode = async (code) => {
    try {
      const product = await productsModel.findOne({ code });
      return product;
    } catch (e) {
      throw new daoError("Fail getting product by code");
    }
  };

  create = async (product) => {
    try {
      const newProduct = await productsModel.create(product);
      return newProduct;
    } catch (e) {
      throw new daoError("Fail creating product");
    }
  };

  update = async (id, newData) => {
    try {
      const product = await productsModel.updateOne(
        { _id: id },
        { $set: newData }
      );
      return product;
    } catch (e) {
      throw new daoError("Fail updating product");
    }
  };

  delete = async (id) => {
    try {
      const result = await productsModel.deleteOne({ _id: id });
      return result;
    } catch (e) {
      throw new daoError("Fail deleting product");
    }
  };
}
