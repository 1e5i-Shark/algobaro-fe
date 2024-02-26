import { createBrowserRouter } from 'react-router-dom';

import {
  CreateRoomPage,
  HomePage,
  NotFoundPage,
  ProblemSharePage,
  ProblemSolvePage,
  ProfilePage,
  RoomPage,
  SignUpPage,
  WelcomePage,
} from '@/pages';
import Layout from '@/pages/Layout';

import { PATH } from './path';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <WelcomePage />,
  },
  {
    path: `${PATH.ROOM}/:roomId`,
    element: <PrivateRoute component={<RoomPage />} />,
  },
  {
    element: <Layout kind="default" />,
    children: [
      {
        path: PATH.HOME,
        element: <PrivateRoute component={<HomePage />} />,
      },
      {
        path: PATH.SIGNUP,
        element: <SignUpPage />,
      },
      {
        path: `${PATH.PROFILE}/:userId`,
        element: <PrivateRoute component={<ProfilePage />} />,
      },
      {
        path: PATH.CREATEROOM,
        element: <PrivateRoute component={<CreateRoomPage />} />,
      },
    ],
  },
  {
    element: <Layout kind="ps" />,
    children: [
      {
        path: `${PATH.PROBLEMSOLVE}/:roomId`,
        element: <PrivateRoute component={<ProblemSolvePage />} />,
      },
      {
        path: `${PATH.PROBLEMSHARE}/:roomId`,
        element: <PrivateRoute component={<ProblemSharePage />} />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
