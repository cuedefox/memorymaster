import { createContext, useState } from "react";
import React from "react";

export const Difficulty = createContext({});

const DifficultyProvider = ({ children }) => {
    const [difficulty, setDifficulty] = useState(1);
    const [cardValues, setCardValues] = useState(["A", "B", "C", "D", "E", "F", "G", "H"]);
    const [win, setWin] = useState(false);

    return (
        <Difficulty.Provider
            value={{
                difficulty,
                setDifficulty,
                cardValues,
                setCardValues,
                win,
                setWin
            }}
        >
            {children}
        </Difficulty.Provider>
    );
};

export default DifficultyProvider;