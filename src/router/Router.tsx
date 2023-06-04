import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import HomeContainer from "../containers/HomeContainer";
import SelectDifficultyContainer from "../containers/SelectDifficultyContainer";
import GameContainer from "../containers/GameContainer";
import EndGameContainer from "../containers/EndGameContainer";

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