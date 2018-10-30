import React, { Component } from "react";

import Search from "./Search";
import Results from "./Results";
import SavedArticles from "./SavedArticles";

import "../css/Scrubber.css";

class Scrubber extends Component {
  state = {
    search: "",
    articles: [],
    savedArticles: []
  };

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(`http://localhost:4000/api/scrub/${this.state.search}`)
      .then(res => res.json())
      .then(articles => {
        this.setState({ articles });
      });
  };

  handleSave = event => {
    event.persist();
    fetch("http://localhost:4000/api/saveArticle", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: event.target.parentElement.firstChild.firstChild.textContent,
        url: event.target.parentElement.firstChild.firstChild.getAttribute(
          "href"
        )
      })
    }).then(res => {
      let articles = this.state.articles;
      const splicedArticle = articles.splice(
        event.target.parentElement.getAttribute("data-id"),
        1
      )[0];
      const savedArticle = {
        title: splicedArticle.title,
        url: splicedArticle.url,
        date: "Just Now"
      };

      this.setState({
        savedArticles: [...this.state.savedArticles, savedArticle]
      });
      this.setState({
        articles
      });
    });
  };

  handleRemove = event => {
    event.persist();
    fetch(
      `http://localhost:4000/api/deletedSavedArticle/${event.target.parentElement.getAttribute(
        "data-id"
      )}`,
      { method: "DELETE" }
    ).then(res => {
      let articles = this.state.savedArticles;
      articles.splice(event.target.parentElement.getAttribute("data-index"), 1);

      this.setState({
        savedArticles: articles
      });
    });
  };

  getSavedArticles = event => {
    fetch("http://localhost:4000/api/savedArticles")
      .then(res => res.json())
      .then(savedArticles => {
        this.setState({ savedArticles });
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <h1>New York Times Article Scrubber</h1>
            <h4>Search for and annotate articles of interest!</h4>
          </div>
        </header>
        <Search
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <Results articles={this.state.articles} handleSave={this.handleSave} />
        <SavedArticles
          handleRemove={this.handleRemove}
          savedArticles={this.state.savedArticles}
          getSavedArticles={this.getSavedArticles}
        />
      </div>
    );
  }
}

export default Scrubber;
