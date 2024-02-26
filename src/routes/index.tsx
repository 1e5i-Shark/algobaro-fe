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

import { CheckUserLogin } from './CheckUserLogin';
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
    loader: CheckUserLogin,
  },
  {
    element: <Layout kind="default" />,
    children: [
      {
        path: PATH.HOME,
        element: <PrivateRoute component={<HomePage />} />,
        loader: CheckUserLogin,
      },
      {
        path: PATH.SIGNUP,
        element: <SignUpPage />,
      },
      {
        path: `${PATH.PROFILE}/:userId`,
        element: <PrivateRoute component={<ProfilePage />} />,
        loader: CheckUserLogin,
      },
      {
        path: PATH.CREATEROOM,
        element: <PrivateRoute component={<CreateRoomPage />} />,
        loader: CheckUserLogin,
      },
    ],
  },
  {
    element: <Layout kind="ps" />,
    children: [
      {
        path: `${PATH.PROBLEMSOLVE}/:roomId`,
        element: <PrivateRoute component={<ProblemSolvePage />} />,
        loader: CheckUserLogin,
      },
      {
        path: `${PATH.PROBLEMSHARE}/:roomId`,
        element: <PrivateRoute component={<ProblemSharePage />} />,
        loader: CheckUserLogin,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
