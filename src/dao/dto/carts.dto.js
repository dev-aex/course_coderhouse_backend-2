export default class Cart {
  constructor(user) {
    this.products = [];
    this.total;
    this.user = user._id;
  }
}
