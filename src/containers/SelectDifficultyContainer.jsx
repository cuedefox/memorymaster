import React, { useContext } from "react";
import {Difficulty} from "../context/Difficulty.jsx";
import { useNavigate, Link } from "react-router-dom";

const SelectDifficultyContainer = () => {
    const {setDifficulty, setCardValues} = useContext(Difficulty);

    const navigate = useNavigate();

    const handleDifficulty = (difficulty) => {
        setDifficulty(difficulty);
        switch(difficulty) {
            case 1:
                setCardValues(["A", "B", "C", "D", "E", "F", "G", "H"]);
                break;
            case 2:
                setCardValues(["A", "B", "C", "D", "E", "F", "G", "H", "I"]);
                break;
            case 3:
                setCardValues(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]);
                break;
            default:
                break;
        }
        navigate('/game');
    }

    return <main className="select-difficulty">
        <Link to={'/'}><button className="back-home">{'< Regresar'}</button></Link>
        <button className="easy-button" onClick={() => handleDifficulty(1)} >Fácil</button>
        <button className="normal-button" onClick={() => handleDifficulty(2)} >Normal</button>
        <button className="hard-button" onClick={() => handleDifficulty(3)} >Difícil</button>
    </main>
}

export default SelectDifficultyContainer;