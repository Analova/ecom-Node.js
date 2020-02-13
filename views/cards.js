const Repository = require("./repository");

class CartsRepository extends Repository {}

module.exports = new CartsRepository("catrs.json");
