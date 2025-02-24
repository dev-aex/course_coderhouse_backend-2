import Product from "../dao/classes/products.dao.js";
import productsDto from "../dao/dto/products.dto.js";
import { controllerError } from "../utils/errorsHandler.js";

const productService = new Product();

// FIND ALL PRODUCTS
const findAll = async () => {
  const products = await productService.getAll();

  if (!products) throw new controllerError("Products not found");

  return products;
};

// FIND ONE PRODUCT BY ID
const findOneById = async (id) => {
  const product = await productService.getById(id);

  if (!product) throw new controllerError("Product not found");

  return product;
};

// UPDATE ONE PRODUCT BY ID
const updateOneById = async (id, newData) => {
  const productFound = await productService.getById(id);

  if (!productFound) throw new controllerError("Product not found");

  const { name, description, price, stock } = newData;

  const updateProduct = {
    name,
    description,
    price,
    stock,
  };

  const result = await productService.update(productFound._id, updateProduct);

  if (!result) throw new controllerError("Fail updating product");

  return result;
};

// CREATE PRODUCT
const createOne = async (product) => {
  const productFound = await productService.getByCode(product.code);

  if (productFound) throw new controllerError("Product already exits");

  const formattedProduct = new productsDto(product);

  if (!formattedProduct) throw new controllerError("Fail formatting product");

  const newProduct = await productService.create(formattedProduct);

  if (!newProduct) throw new controllerError("Fail creating one product");

  return newProduct;
};

// DELETE PRODUCT
const deleteOneById = async (id) => {
  const result = await productService.delete(id);

  if (!result) throw new controllerError("Fail deleting one product");

  return result;
};

export default {
  findAll,
  findOneById,
  updateOneById,
  createOne,
  deleteOneById,
};
