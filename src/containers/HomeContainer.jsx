import React from "react";
import title from "../assets/img/title.svg";
import { Link } from "react-router-dom";

const HomeContainer = () => {
    return <main className="home-container">
        <img src={title} alt="meow match titulo" />
        <Link to={'/difficulty'}>
            <button>Jugar</button>
        </Link> 
    </main>
}

export default HomeContainer;