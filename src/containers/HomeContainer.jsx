import React from "react";
import { Link } from "react-router-dom";

const HomeContainer = () => {
    return <main className="home-container">
        <h1>Meow Match</h1>
        <Link to={'/difficulty'}>
            <button>Jugar</button>
        </Link> 
    </main>
}

export default HomeContainer;