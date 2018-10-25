import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Container from "./components/container";
import Footer from "./components/footer";

const defaultCards = [
  {
    id: 1,
    brand: "fab fa-cc-paypal fa-10x",
    clicked: false
  },
  {
    id: 2,
    brand: "fab fa-android fa-10x",
    clicked: false
  },
  {
    id: 3,
    brand: "fab fa-amazon-pay fa-10x",
    clicked: false
  },
  {
    id: 4,
    brand: "fab fa-apple-pay fa-10x",
    clicked: false
  },
  {
    id: 5,
    brand: "fab fa-cc-stripe fa-10x",
    clicked: false
  },
  {
    id: 6,
    brand: "fab fa-google fa-10x",
    clicked: false
  },
  {
    id: 7,
    brand: "fab fa-js fa-10x",
    clicked: false
  },
  {
    id: 8,
    brand: "fab fa-linkedin fa-10x",
    clicked: false
  },
  {
    id: 9,
    brand: "fab fa-linkedin-in fa-10x",
    clicked: false
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      highScore: 0,
      cards: defaultCards
    };
  }

  handleIncrement = event => {
    const prevCards = this.state.cards.slice();

    const card = prevCards.find(
      element =>
        element.id ===
        parseInt(event.target.parentElement.getAttribute("data-id"))
    );

    try {
      prevCards.splice(
        prevCards.findIndex(element => element.id === card.id),
        1,
        card
      );

      if (card.clicked) {
        this.setState({ counter: 0, cards: defaultCards });
      } else {
        card.clicked = true;
        this.setState({
          counter: this.state.counter + 1,
          cards: prevCards
        });
      }

      if (this.state.counter > this.state.highScore) {
        this.setState({ highScore: this.state.counter });
      }

      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <Navbar score={this.state.counter} highScore={this.state.highScore} />
        <Header />
        <Container cards={this.state.cards} onClick={this.handleIncrement} />
        <Footer />
      </div>
    );
  }
}

export default App;
