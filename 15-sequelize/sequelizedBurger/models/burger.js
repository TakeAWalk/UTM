var orm = require("../config/orm");

var burger = {
  all: function(cb) {
    orm.selectAll(res => {
      cb(res);
    });
  },
  insert: function(burgerName, cb) {
    orm.insertOne(burgerName, res => {
      cb(res);
    });
  },
  update: function(burger_name, devoured, id, cb) {
    orm.updateOne(burger_name, devoured, id, res => {
      cb(res);
    });
  }
};

module.exports = burger;
