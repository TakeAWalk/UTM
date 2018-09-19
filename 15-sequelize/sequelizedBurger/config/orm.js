var connection = require("./connection.js");

var orm = {
  selectAll: cb => {
    var queryString = "SELECT * FROM burgers";
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne: (burger_name, cb) => {
    var queryString =
      "INSERT INTO burgers (burger_name, devoured) VALUES (?, 0)";
    connection.query(queryString, [burger_name], (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  updateOne: (burger_name, devoured, id, cb) => {
    var queryString =
      "UPDATE burgers SET burger_name = ?, devoured = ? WHERE id=?";
    connection.query(
      queryString,
      [burger_name, devoured, id],
      (err, result) => {
        if (err) throw err;
        cb(result);
      }
    );
  }
};

module.exports = orm;
