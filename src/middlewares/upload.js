const multer = require("multer");
const path = require("path");

const db = require("../config/postgre");
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const suffix = `${Date.now()}-${Math.round(Math.random(1 * 1e2))}`;
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${suffix}${ext}`;
    cb(null, fileName);
  },
});

const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });

module.exports = upload;
