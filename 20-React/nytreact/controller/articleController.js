const cheerio = require("cheerio");
const axios = require("axios");
const request = require("request");
const mongoose = require("mongoose");
const Article = require("../models/Article");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");

module.exports = {
  scrapeWebDev: function(cb) {
    axios.get("https://old.reddit.com/r/webdev/").then(function(response) {
      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(response.data);

      // An empty array to save the data that we'll scrape
      var results = [];

      // With cheerio, find each p-tag with the "title" class
      // (i: iterator. element: the current element)
      $("p.title").each(function(i, element) {
        // Save the text of the element in a "title" variable
        var title = $(element).text();

        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        var link = $(element)
          .children()
          .attr("href");

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          title: title,
          url: link
        });
      });

      cb(results);
    });
  },

  scrub: function(q, cb) {
    request.get(
      {
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
          "api-key": "46ee33d1e00f4d4a82338262078b7767",
          q
        }
      },
      function(err, response, body) {
        body = JSON.parse(body);

        const article = [];

        for (let i = 0; i < 5; i++)
          article.push({
            title: body.response.docs[i].headline.main,
            url: body.response.docs[i].web_url
          });

        cb(article);
      }
    );
  },

  saveArticle: function({ title, url }, cb) {
    const article = new Article({
      title,
      url
    });
    article.save().then(() => cb(article));
  },

  getSavedArticles: function(cb) {
    Article.find({}).then(result => cb(result));
  },

  deleteSavedArticle: function(id, cb) {
    Article.findByIdAndDelete(id, (err, response) => {
      cb(response);
    });
  }
};
