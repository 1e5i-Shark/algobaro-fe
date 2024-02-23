import { createBrowserRouter, Outlet } from 'react-router-dom';

import Header from '@/components/Common/Header/Header';
import PrivateRoute from '@/components/PrivateRoute';
import PSHeader from '@/components/PSHeader/PSHeader';
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

import { CheckUserLogin } from './CheckUserLogin';
import { PATH } from './path';

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
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
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
    element: (
      <>
        <PSHeader />
        <Outlet />
      </>
    ),
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
