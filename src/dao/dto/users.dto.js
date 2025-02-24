import { generateHash } from "../../utils/bcrypt.js";

export default class User {
  constructor(user) {
    this.first_name = user.first_name || null;
    this.last_name = user.last_name || null;
    this.email = user.email;
    this.age = user.age || null;
    this.password = generateHash(user.password);
    this.role = user.role || "user";
    this.cart;
  }
}
