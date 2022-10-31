const datauriParser = require("datauri/parser");
const { query } = require("express");
const path = require("path");
const cloudinary = require("../config/cloudinary");

const uploader = async (req, res, next) => {
  const { body, file } = req;
  if (!file) return next();

  const parser = new datauriParser();
  const buffer = file.buffer;
  const ext = path.extname(file.originalname).toString();
  const datauri = parser.format(ext, buffer);
  const fileName = `${query.name}_${query.user_id}`;
  const coludinaryOpt = {
    public_id: fileName,
    folder: "web11",
  };

  try {
    const result = await cloudinary.uploader.upload(
      datauri.content,
      coludinaryOpt
    );
    req.file = result;
    next();
  } catch (err) {
    console.log(err);
    res.status(err).json({ msg: "internal server error" });
  }
};

module.exports = uploader;
