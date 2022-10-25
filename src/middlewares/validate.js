module.exports = {
  body: (...allowedKeys) => {
    return (req, res, next) => {
      const { body } = req;
      const sanitizedKey = Object.keys(body).filter((key) =>
        allowedKeys.includes(key)
      );
      const newBody = {};
      for (let key of sanitizedKey) {
        Object.assign(newBody, { [key]: body[key] });
      }
      // apakah jumlah key di body sesuai dengan jumlah di allowedKeys
      if (Object.keys(newBody).length === 0)
        return res.status(400).json({ msg: "tidak ada yang diinsert" });
      // apakah setiap value sesuai dengan tipe data yang diinginkan
      if (Object.keys(newBody).length !== allowedKeys.length)
        return res.status(400).json({ msg: "input does not match key" });
      req.body = newBody;
      next();
    };
  },
};
