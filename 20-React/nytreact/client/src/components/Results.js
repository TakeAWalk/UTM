import React from "react";
import "../css/Results.css";

const Results = props => (
  <div className="container">
    <h2>Results</h2>
    {props.articles.map((article, index) => (
      <div className="article" key={index} data-id={index}>
        <p>
          <a href={article.url}>{article.title}</a>
        </p>
        <button className="btn" onClick={props.handleSave}>
          Save
        </button>
      </div>
    ))}
  </div>
);

export default Results;
