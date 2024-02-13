import { createBrowserRouter } from 'react-router-dom';

import CreateLobby from '../pages/CreateLobby/CreateLobby';
import Home from '../pages/Home/Home';
import Lobby from '../pages/Lobby/Lobby';
import Main from '../pages/Main/Main';
import NotFound from '../pages/NotFound/NotFound';
import ProblemShare from '../pages/ProblemShare/ProblemShare';
import ProblemSolve from '../pages/ProblemSolve/ProblemSolve';
import Profile from '../pages/Profile/Profile';
import SignUp from '../pages/SignUp/SignUp';
import Welcome from '../pages/Welcome/Welcome';
import { PATH } from './path';

export const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: PATH.ROOT,
        element: <Welcome />,
      },
      {
        path: PATH.SIGNUP,
        element: <SignUp />,
      },
      {
        path: PATH.Home,
        element: <Home />,
      },
      {
        path: `${PATH.PROFILE}/:userId`,
        element: <Profile />,
      },
      {
        path: PATH.CREATELOBBY,
        element: <CreateLobby />,
      },
      {
        path: `${PATH.LOBBY}/:lobbyId"`,
        element: <Lobby />,
      },
      {
        path: `${PATH.PROBLEMSOLVE}/:lobbyId"`,
        element: <ProblemSolve />,
      },
      {
        path: `${PATH.PROBLEMSHARE}/:lobbyId"`,
        element: <ProblemShare />,
      },
    ],
  },
]);
