import {React, useContext } from "react";
import { Link } from "react-router-dom";
import { Difficulty } from "../context/Difficulty";

const EndGameContainer = () => {
    const {win} = useContext(Difficulty);
    const imgs = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const randomIndex = Math.floor(Math.random() * imgs.length);
    const randomValue = imgs[randomIndex];
    const cargarImagen = require.context("../assets/img/cards", true);

    return <main className="end-game-container">
        {
            win ?
            <><p className="win">Ganaste</p> 
            <img src={cargarImagen(`./${randomValue}.png`)} alt="" /></> :
            <p className="lose">Perdiste</p>
        }
        <Link to={'/'}><button>Volver al menu</button></Link>
    </main>
}

export default EndGameContainer;