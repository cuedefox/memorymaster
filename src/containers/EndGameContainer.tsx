import { useContext } from "react";
import { Link } from "react-router-dom";
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

const EndGameContainer = () => {
    const {win} = useContext(Difficulty);
    const imgs: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const randomIndex: number = Math.floor(Math.random() * imgs.length);
    const randomValue: string = imgs[randomIndex];
    const cargarImagen = require.context("../assets/img/cards", true);

    return <main className="end-game-container">
        {
            win ?
            <>
                <p className="win">Victoria</p> 
                <img src={cargarImagen(`./${randomValue}.png`)} alt="" />
            </> 
            :
            <p className="lose">Derrota</p>
        }
        <Link to={'/'}><button>Volver al menu</button></Link>
    </main>
}

export default EndGameContainer;