import { createBrowserRouter } from 'react-router-dom';

import CreateRoomPage from '@/pages/CreateRoomPage';
import HomePage from '@/pages/HomePage';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProblemSharePage from '@/pages/ProblemSharePage';
import ProblemSolvePage from '@/pages/ProblemSolvePage';
import ProfilePage from '@/pages/ProfilePage';
import RoomPage from '@/pages/RoomPage';
import SignUpPage from '@/pages/SignUpPage';
import WelcomePage from '@/pages/WelcomePage';

import { PATH } from './path';

export const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <MainPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: PATH.ROOT,
        element: <WelcomePage />,
      },
      {
        path: PATH.SIGNUP,
        element: <SignUpPage />,
      },
      {
        path: PATH.HOME,
        element: <HomePage />,
      },
      {
        path: `${PATH.PROFILE}/:userId`,
        element: <ProfilePage />,
      },
      {
        path: PATH.CREATEROOM,
        element: <CreateRoomPage />,
      },
      {
        path: `${PATH.ROOM}/:roomId`,
        element: <RoomPage />,
      },
      {
        path: `${PATH.PROBLEMSOLVE}/:roomId`,
        element: <ProblemSolvePage />,
      },
      {
        path: `${PATH.PROBLEMSHARE}/:roomId`,
        element: <ProblemSharePage />,
      },
    ],
  },
]);
