import Cart from "../dao/classes/carts.dao.js";
import Product from "../dao/classes/products.dao.js";
import { controllerError } from "../utils/errorsHandler.js";

const cartService = new Cart();
const productService = new Product();

// FIND ALL CARTS
const findAll = async () => {
  const carts = await cartService.getAll();

  if (!carts) throw new controllerError("Carts not found");

  return carts;
};

// FIND ONE CART BY ID
const findOneById = async (id) => {
  const cart = await cartService.getById(id);

  if (!cart) throw new controllerError("Cart not found");

  return cart;
};

// FIND ONE CART BY ID POPULATE
const findOneByIdPopulate = async (id) => {
  const cart = await cartService.getByIdPopulate(id);

  if (!cart) throw new controllerError("Cart not found");

  return cart;
};

// UPDATE ONE CART BY ID
const updateOneById = async (id, newData) => {
  const cartFound = await cartService.getById(id);

  if (!cartFound) throw new controllerError("Cart not found");

  const { products, total } = newData;

  const updateCart = {
    products,
    total,
  };

  const result = await cartService.update(cartFound._id, updateCart);

  if (!result) throw new controllerError("Fail updating cart");

  return result;
};

// ADD ONE PRODUCTS TO ONE CART BY ID
const addOneProductToCartById = async (cartId, productId) => {
  const cartFound = await cartService.getById(cartId);

  if (!cartFound) throw new controllerError("Cart not found");

  const productFound = await productService.getById(productId);

  if (!productFound) throw new controllerError("Product not found");

  const productIndex = cartFound.products.findIndex(
    (item) => item.product.toString() === productId
  );

  if (productIndex !== -1) {
    const updatedProducts = cartFound.products.map((item, index) => {
      if (index === productIndex) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    cartFound.products = updatedProducts;
  } else {
    const newProduct = {
      product: productFound._id,
      quantity: Number(1),
    };
    cartFound.products.push(newProduct);
  }

  const cartTotal = cartFound.total + productFound.price;

  const result = await cartService.update(cartFound._id, {
    products: cartFound.products,
    total: cartTotal,
  });

  if (!result) throw new controllerError("Fail updating cart");

  return result;
};

// DELETE ONE PRODUCT ON CART BY ID
const deleteOneProductOnCartById = async (cartId, productId) => {
  const cartFound = await cartService.getById(cartId);

  if (!cartFound) throw new controllerError("Cart not found");

  const productFound = await productService.getById(productId);

  if (!productFound) throw new controllerError("Product not found");

  const productIndex = cartFound.products.findIndex(
    (item) => item.product.toString() === productId
  );

  if (productIndex === -1) {
    throw new controllerError("Product not found in cart");
  }
  const cartTotal =
    cartFound.total -
    productFound.price * cartFound.products[productIndex].quantity;

  cartFound.products.splice(productIndex, 1);

  const result = await cartService.update(cartFound._id, {
    products: cartFound.products,
    total: cartTotal,
  });

  if (!result) throw new controllerError("Fail updating cart");

  return result;
};

// DELETE ALL PRODUCTS ON CART
const deleteAllProductsOnCart = async (cartId) => {
  const cartFound = await cartService.getById(cartId);

  if (!cartFound) throw new controllerError("Cart not found");

  cartFound.products = [];
  cartFound.total = Number(0);

  const result = await cartService.update(cartFound._id, cartFound);

  if (!result) throw new controllerError("Fail updating cart");

  return result;
};

// CREATE CART
const createOne = async (userId) => {
  const newCart = await cartService.create({ user: userId });

  if (!newCart) throw new controllerError("Fail creating product");

  return newCart;
};

// DELETE CART
const deleteOneById = async (id) => {
  const result = await cartService.delete(id);

  if (!result) throw new controllerError("Fail deleting cart");

  return result;
};

export default {
  findAll,
  findOneById,
  updateOneById,
  createOne,
  deleteOneById,
  addOneProductToCartById,
  deleteOneProductOnCartById,
  findOneByIdPopulate,
  deleteAllProductsOnCart,
};
