import React from "react";
import "../css/container.css";

const Container = props => (
  <main className="container">
    {props.cards.map(card => (
      <div key={card.id} data-id={card.id} onClick={props.onClick}>
        <i className={card.brand} />
      </div>
    ))}
  </main>
);

export default Container;
