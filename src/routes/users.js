const express = require("express");
const islogin = require("../middlewares/isLogin");

const users = express.Router();

const {
  create,
  drop,
  getAll,
  editPassword,
  getId,
} = require("../controllers/users");
const validate = require("../middlewares/validate");

users.get("/", getAll);

users.post("/", validate.body("email", "password", "phone_number"), create);

users.patch("/account", editPassword);

users.delete("/:id", drop);

users.get("/profile", islogin(), getId);

module.exports = users;
