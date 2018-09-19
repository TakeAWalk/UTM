var express = require("express");

var Burger = require("../models/burger");

var app = express();

app.get("/", (req, res) => {
  Burger.findAll({}).then(result => {
    res.render("index", { burger: result });
  });
});

app.post("/", (req, res) => {
  Burger.create({
    burger_name: req.body.burger_name,
    devoured: 0
  }).then(result => {
    res.status(200).end();
  });
});

app.put("/", (req, res) => {
  Burger.update(
    {
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    },
    {
      where: {
        id: req.body.id
      }
    }
  ).then(result => {
    res.status(200).end();
  });
});

module.exports = app;
