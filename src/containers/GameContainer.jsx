import {React, useState, useEffect, useContext } from "react";
import back from "../assets/img/cards/card.png";
import { useNavigate, Link } from "react-router-dom";
import { Difficulty } from "../context/Difficulty";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const GameContainer = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [solvedCards, setSolvedCards] = useState([]);
    const {difficulty, cardValues, setWin} = useContext(Difficulty);
    const [timeLeft, setTimeLeft] = useState(() => {
      switch (difficulty) {
        case 1:
          return 90;
        case 2:
          return 60;
        case 3:
          return 45;
        default: 
          return 90;
      }
    });

    const cargarImagen = require.context("../assets/img/cards", true);
    const navigate = useNavigate();

    useEffect(() => {
      if (timeLeft === 0) {
        navigate("/gameEnd");
      } else {
        const timerId = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timerId);
      }
    }, [timeLeft, navigate]);
  
    useEffect(() => {
      const initialCards = shuffle([
        ...cardValues,
        ...cardValues
      ]).map((value) => ({ value, isFlipped: false, isSolved: false }));
      setCards(initialCards);
      setWin(false);
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
          }, 2000);
        }
      }
    }, [flippedCards]);

    useEffect(() => {
      if (solvedCards.length === (cardValues.length * 2)) {
        setWin(true);
        navigate("/gameEnd");
      }
    }, [solvedCards, cards, navigate])
  
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
  
    return <main className="game">
        <Link to={'/'}><button className="back-home">{'< Regresar'}</button></Link>
        <p className="time-left">Tiempo: {timeLeft}</p>
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
    </main>
}

export default GameContainer;