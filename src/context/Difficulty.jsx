import { createContext, useState } from "react";
import React from "react";

export const Difficulty = createContext({});

const DifficultyProvider = ({ children }) => {
    const [difficulty, setDifficulty] = useState(1);

    return (
        <Difficulty.Provider
            value={{
                difficulty,
                setDifficulty
            }}
        >
            {children}
        </Difficulty.Provider>
    );
};

export default DifficultyProvider;