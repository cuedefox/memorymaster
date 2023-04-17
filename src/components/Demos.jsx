import {React, useState, useEffect } from "react";
import back from "../assets/img/cards/card.png";
import "../sass/demos.scss";

const CARD_VALUES = ["A", "B", "C", "D", "E", "F", "G"];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Demos() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [solvedCards, setSolvedCards] = useState([]);

  const cargarImagen = require.context("../assets/img/cards", true);

  useEffect(() => {
    const initialCards = shuffle([
      ...CARD_VALUES,
      ...CARD_VALUES
    ]).map((value) => ({ value, isFlipped: false, isSolved: false }));
    setCards(initialCards);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards.map(({ card, index }) => ({ value: card.value, index }));
      if (card1.value === card2.value) {
        setSolvedCards([...solvedCards, card1, card2]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[card1.index].isFlipped = false;
          newCards[card2.index].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  const flipCard = (cardIndex) => {
    if (flippedCards.length === 2) {
      return;
    }
    const card = cards[cardIndex];
    if (card.isFlipped || card.isSolved) {
      return;
    }
    const newCards = [...cards];
    newCards[cardIndex] = { ...card, isFlipped: true };
    setCards(newCards);
    setFlippedCards([...flippedCards, { card, index: cardIndex }]);
  };

  return (
    <div className="game-container">
      {cards.map((card, index) => (
        <div
          style={{ backgroundImage: `url(${back})`}}
          key={index}
          className={`card ${card.isFlipped ? "flipped" : ""} ${
            card.isSolved ? "solved" : ""
          }`}
          onClick={() => flipCard(index)}
        >
          {card.isFlipped || card.isSolved ? 
          <img src={cargarImagen(`./${card.value}.png`)} alt={`Imagen de la carta ${card.value}`} /> : 
          ""}
        </div>
      ))}
    </div>
  );
}

export default Demos;