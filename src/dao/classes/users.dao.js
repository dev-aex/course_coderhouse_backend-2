import usersModel from "../models/users.model.js";
import { daoError } from "../../utils/errorsHandler.js";

export default class User {
  getAll = async () => {
    try {
      const users = await usersModel.find();
      return users;
    } catch (e) {
      throw new daoError("Fail getting all the users");
    }
  };

  getById = async (id) => {
    try {
      const user = await usersModel.findOne({ _id: id });
      return user;
    } catch (e) {
      throw new daoError("Fail getting user by id");
    }
  };

  getByEmail = async (email) => {
    try {
      const user = await usersModel.findOne({ email });
      return user;
    } catch (e) {
      throw new daoError("Fail getting user by email");
    }
  };

  create = async (user) => {
    try {
      const newUser = await usersModel.create(user);
      return newUser;
    } catch (e) {
      throw new daoError("Fail creating user");
    }
  };

  update = async (id, newData) => {
    try {
      const user = await usersModel.updateOne({ _id: id }, { $set: newData });
      return user;
    } catch (e) {
      throw new daoError("Fail updating user");
    }
  };

  delete = async (id) => {
    try {
      const result = await usersModel.deleteOne({ _id: id });
      return result;
    } catch (e) {
      throw new daoError("Fail deleting user");
    }
  };
}
