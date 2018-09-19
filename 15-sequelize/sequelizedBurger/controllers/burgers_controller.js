var express = require("express");

var burger = require("../models/burger");

var app = express();

app.get("/", (req, res) => {
  burger.all(data => {
    res.render("index", { burger: data });
  });
});

app.get("/", (req, res) => {
  burger.all(data => {
    res.render("index", { burger: data });
  });
});

app.post("/", (req, res) => {
  burger.insert(req.body.burger_name, ressult => {
    res.status(200).end();
  });
});

app.put("/", (req, res) => {
  burger.update(
    req.body.burger_name,
    req.body.devoured,
    req.body.id,
    result => {
      res.status(200).end();
    }
  );
});

module.exports = app;
