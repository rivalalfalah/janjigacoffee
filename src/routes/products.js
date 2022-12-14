const express = require("express");
const {
  create,
  edit,
  drop,
  getAll,
  getId,
} = require("../controllers/products");
const { getSort } = require("../repo/products");
const imageUpload = require("../middlewares/upload");
const isLogin = require("../middlewares/isLogin");

const products = express.Router();

// http://localhost:8080/api/product
products.get("/", getAll);

products.get("/product/:id", getId);

products.post("/", isLogin(), imageUpload.single("image"), create);

products.patch("/:id", edit);

products.delete("/:id", drop);

module.exports = products;
