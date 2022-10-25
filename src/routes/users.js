const express = require("express");

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

users.get("/:id", getId);

module.exports = users;
