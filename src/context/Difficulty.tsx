import { createContext, useState, ReactNode } from "react";

type DifficultyContextType = {
    difficulty: number;
    setDifficulty: (difficulty: number) => void;
    cardValues: string[];
    setCardValues: (cardValues: string[]) => void;
    win: boolean;
    setWin: (win: boolean) => void;
};
  
export const Difficulty = createContext<DifficultyContextType>({
    difficulty: 1,
    setDifficulty: () => {},
    cardValues: [],
    setCardValues: () => {},
    win: false,
    setWin: () => {},
});

const DifficultyProvider = ({children}: {children: ReactNode}) => {
    const [difficulty, setDifficulty] = useState<number>(1);
    const [cardValues, setCardValues] = useState<string[]>(["A", "B", "C", "D", "E", "F", "G", "H"]);
    const [win, setWin] = useState<boolean>(false);

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