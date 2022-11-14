const { Query } = require("pg");
const postgreDB = require("../config/postgre");
const products = require("../routes/products");

const searchAllProduct = (queryparams) => {
  return new Promise((resolve, reject) => {
    let query = "select name,size_id,price,category_id from products";

    // Search name product
    if (queryparams.name_product) {
      query += `where lower(products.name) like lower('%${queryparams.name_product}%') `;
    }

    // Filter category
    if (queryparams.category_id) {
      if (queryparams.name_product) {
        query += `and product.category_id = ${queryparams.category_id} `;
      } else {
        query += `product.category_id = ${queryparams.category_id} `;
      }
    }

    if (queryparams.sorting == "cheapest") {
      query += "order by price asc";
    }
    if (queryparams.sorting == "expensive") {
      query += "order by price desc";
    }
    if (queryparams.sorting == "newest") {
      query += "order by create_at asc";
    }
    if (queryparams.sorting == "lates") {
      query += "order by create_at desc";
    }

    const page = Number(queryparams.page);
    const limit = Number(queryparams.limit);
    const offset = (page - 1) * limit;
    query += ` limit ${limit} offset ${offset}`;

    postgreDB.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const getProductId = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "select name,price,image,description from products where id $1";
    postgreDB.query(query, [body], (err, queryResult) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(queryResult);
    });
  });
};

const createProducts = (body, file) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into products(name,category_id,size_id,price,image,stock,description) values ($1,$2,$3,$4,$5,$6,$7)";
    const { name, category_id, size_id, price, stock, description } = body;
    postgreDB.query(
      query,
      [name, category_id, size_id, price, file, stock, description],
      (err, queryResult) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(queryResult);
      }
    );
  });
};

const editProducts = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update products set ";
    const values = [];

    Object.keys(req.body).forEach((key, idx, array) => {
      if (idx === array.length - 1) {
        query += `${key} = $${idx + 1} where id = $${idx + 2}`;
        values.push(body[key], params.id);
        return;
      }
      query += `${key} = $${idx + 1},`;
      values.push(body[key]);
    });
    // res.json({
    //   query,
    //   values,
    // });
    postgreDB
      .query(query, values)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const dropProducts = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from products where id = $1";
    postgreDB.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const productsRepo = {
  searchAllProduct,
  getProductId,
  createProducts,
  editProducts,
  dropProducts,
};

module.exports = productsRepo;
