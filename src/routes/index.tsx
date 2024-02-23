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

import { PATH } from './path';

const checkUserLogin = async () => {
  // 유저가 로그인 했는지 검사하는 로직
  return true;
};

export const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <WelcomePage />,
  },
  {
    path: `${PATH.ROOM}/:roomId`,
    element: <PrivateRoute component={<RoomPage />} />,
    loader: checkUserLogin,
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
        loader: checkUserLogin,
      },
      {
        path: PATH.SIGNUP,
        element: <SignUpPage />,
      },
      {
        path: `${PATH.PROFILE}/:userId`,
        element: <PrivateRoute component={<ProfilePage />} />,
        loader: checkUserLogin,
      },
      {
        path: PATH.CREATEROOM,
        element: <PrivateRoute component={<CreateRoomPage />} />,
        loader: checkUserLogin,
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
        loader: checkUserLogin,
      },
      {
        path: `${PATH.PROBLEMSHARE}/:roomId`,
        element: <PrivateRoute component={<ProblemSharePage />} />,
        loader: checkUserLogin,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
