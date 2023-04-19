import React, { useContext } from "react";
import {Difficulty} from "../context/Difficulty.jsx";
import { useNavigate, Link } from "react-router-dom";

const SelectDifficultyContainer = () => {
    const {setDifficulty} = useContext(Difficulty);

    const navigate = useNavigate();

    const handleDifficulty = (difficulty) => {
        setDifficulty(difficulty);
        console.log(difficulty);
        navigate('/game');
    }

    return <main className="select-difficulty">
        <Link to={'/'}><button className="back-home">{'< Regresar'}</button></Link>
        <button className="easy-button" onClick={() => handleDifficulty(1)} >Facil</button>
        <button className="normal-button" onClick={() => handleDifficulty(2)} >Normal</button>
        <button className="hard-button" onClick={() => handleDifficulty(3)} >Dificil</button>
    </main>
}

export default SelectDifficultyContainer;