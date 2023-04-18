import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import HomeContainer from "../containers/HomeContainer.jsx";
import SelectDifficultyContainer from "../containers/SelectDifficultyContainer.jsx";
import GameContainer from "../containers/GameContainer.jsx";
import EndGameContainer from "../containers/EndGameContainer.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h1>Oops, parece que hubo un error</h1>,
        children: [
            {
                path: "/",
                element: <HomeContainer />
            },
            {
                path: "/difficulty",
                element: <SelectDifficultyContainer />,
            },
            {
                path: "/game",
                element: <GameContainer />,
            },
            {
                path: "/gameEnd",
                element: <EndGameContainer />,
            }
        ],
    },
]);

const Router = () => {
    return <RouterProvider router={router} />
};

export default Router;
