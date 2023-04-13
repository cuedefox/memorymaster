import {React, useState, useEffect } from "react";
import playCards from "../db/cards.json";
import "./styles.css";

const CARD_PAIRS = playCards.length;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function MemoryMaster() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [solvedCards, setSolvedCards] = useState([]);

  useEffect(() => {
    const initialCards = shuffle([
      ...playCards,
      ...playCards
    ]).map((value) => ({ value, isFlipped: false, isSolved: false }));
    setCards(initialCards);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (card1.value === card2.value) {
        setSolvedCards([...solvedCards, card1, card2]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
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
    setFlippedCards([...flippedCards, card]);
  };

  return (
    <div className="MemoryMaster">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${card.isFlipped ? "flipped" : ""} ${
            card.isSolved ? "solved" : ""
          }`}
          onClick={() => flipCard(index)}
        >
          {card.isFlipped || card.isSolved ? card.value : ""}
        </div>
      ))}
    </div>
  );
}

export default MemoryMaster;