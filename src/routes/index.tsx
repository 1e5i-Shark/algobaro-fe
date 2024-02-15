import { createBrowserRouter } from 'react-router-dom';

import {
  CreateRoomPage,
  HomePage,
  MainPage,
  NotFoundPage,
  ProblemSharePage,
  ProblemSolvePage,
  ProfilePage,
  RoomPage,
  SignUpPage,
  WelcomePage,
} from '@/pages';

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
