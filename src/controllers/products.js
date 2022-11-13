const { query } = require("express");
const { Query } = require("pg");
const productsRepo = require("../repo/products");

const getAll = async (req, res) => {
  try {
    const response = await productsRepo.searchAllProduct(req.query);
    res.status(200).json({
      result: response.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const getId = async (req, res) => {
  try {
    const response = await productsRepo.getProductId(req.body);
    res.status(200).json({
      result: response.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const create = async (req, res) => {
  try {
    const response = await productsRepo.createProducts(req.body, req.file.path);
    res.status(201).json({
      result: "menambahkan product sukses",
    });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const edit = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const response = await productsRepo.editProducts(req.body, req.params);
    res.status(200).json({ result: "edit product success" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
};

const drop = async (req, res) => {
  try {
    const response = await productsRepo.dropProducts(req.params);
    res.status(200).json({ result: "delete product success" });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const transactionController = {
  getAll,
  getId,
  create,
  edit,
  drop,
};

module.exports = transactionController;
