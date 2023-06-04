import { useState, useEffect, useContext } from "react";
import back from "../assets/img/cards/card.png";
import { useNavigate, Link } from "react-router-dom";
import { Difficulty } from "../context/Difficulty";

declare const require: {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

type Card = {
  value: string,
  isFlipped?: boolean,
  isSolved?: boolean,
  index?: number
}

function shuffle(array: string[]): string[] {
  for (let i: number = array.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const GameContainer = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [solvedCards, setSolvedCards] = useState<Card[]>([]);
  const {difficulty, cardValues, setWin} = useContext(Difficulty);
  const [timeLeft, setTimeLeft] = useState<number>(() => {
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
    const initialCards: Card[] = shuffle([
      ...cardValues,
      ...cardValues
    ]).map((value) => ({ value, isFlipped: false, isSolved: false }));
    setCards(initialCards);
    setWin(false);
  }, [cardValues, setWin]);
  
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2]: Card[] = flippedCards.map(({ value, index }) => ({ value: value, index }));
      if (card1.value === card2.value) {
        setSolvedCards([...solvedCards, card1, card2]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const newCards: Card[] = [...cards];
          if (card1.index !== undefined) {
            newCards[card1.index].isFlipped = false;
          }
          if (card2.index !== undefined) {
            newCards[card2.index].isFlipped = false;
          }
          setCards(newCards);
          setFlippedCards([]);
        }, 2000);
      }
    }
  }, [flippedCards, cards, solvedCards]);

  useEffect(() => {
    if (solvedCards.length === (cardValues.length * 2)) {
      setWin(true);
      navigate("/gameEnd");
    }
  }, [cardValues.length, setWin, navigate, solvedCards.length])
  
  const flipCard = (cardIndex: number): void => {
    if (flippedCards.length === 2) {
      return;
    }
    const card: Card = cards[cardIndex];
    card.index = cardIndex;
    if (card.isFlipped || card.isSolved) {
      return;
    }
    const newCards: Card[] = [...cards];
    newCards[cardIndex] = { ...card, isFlipped: true };
    setCards(newCards);
    setFlippedCards([...flippedCards, card]);
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