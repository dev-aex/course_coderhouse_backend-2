import User from "../dao/classes/users.dao.js";
import Cart from "../dao/classes/carts.dao.js";
import usersDto from "../dao/dto/users.dto.js";
import cartsController from "./carts.controller.js";
import { controllerError } from "../utils/errorsHandler.js";

const userService = new User();
const cartService = new Cart();

// FIND ALL USERS
const getAll = async () => {
  const users = await userService.getAll();

  if (!users) throw new controllerError("Users not found");

  return users;
};

// FIND ONE USER BY ID
const getOneById = async (id) => {
  const user = await userService.getById(id);

  if (!user) throw new controllerError("User not found");

  return user;
};

// FIND ONE USER BY EMAIL
const getOneByEmail = async (email) => {
  const userFound = await userService.getByEmail(email);

  if (!userFound) throw new controllerError("User not found");

  return userFound;
};

// UPDATE ONE USER BY ID
const updateOneById = async (id, newData) => {
  const userFound = await userService.getById(id);

  if (!userFound) throw new controllerError("User not found");

  const { first_name, last_name, age } = newData;

  const updateUser = {
    first_name,
    last_name,
    age,
  };

  const result = await userService.update(userFound._id, updateUser);

  if (!result) throw new controllerError("Fail updating user");

  return result;
};

// CREATE USER
const createOne = async (user) => {
  const userFound = await userService.getByEmail(user.email);

  if (userFound) throw new controllerError("User already exits");

  const formattedUser = new usersDto(user);

  if (!formattedUser) throw new controllerError("Fail formatting user");

  const newUser = await userService.create(formattedUser);

  if (!newUser) throw new controllerError(`Fail creating user"`);

  const newCart = await cartsController.createOne(newUser._id);

  if (!newCart) throw new controllerError("Fail creating user cart");

  const updatedUser = await userService.update(newUser._id, {
    cart: newCart._id,
  });

  if (!updatedUser) {
    throw new controllerError("Fail assigning cart to user");
  }

  return updatedUser;
};

// DELETE USER
const deleteOneById = async (id) => {
  const userFound = await userService.getById(id);

  if (!userFound) throw new controllerError("User not found");

  const deleteCart = await cartService.delete(userFound.cart);

  if (!deleteCart) throw new controllerError("Fail deleting cart");

  const result = await userService.delete(id);

  if (!result) throw new controllerError("Fail deleting user");

  return result;
};

export default {
  getAll,
  getOneById,
  getOneByEmail,
  createOne,
  updateOneById,
  deleteOneById,
};
