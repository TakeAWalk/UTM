import React from "react";

const Navbar = props => (
  <nav className="navbar">
    <ul>
      <li className="brand">Clicky Game</li>
      <li className="score">Score: {props.score}</li>
      <li className="highScore">High Score: {props.score}</li>
    </ul>
    navbar
  </nav>
);

export default Navbar;
