import { createBrowserRouter } from 'react-router-dom';

import Header from '@/components/Common/Header/Header';
import PSHeader from '@/components/Common/Header/PSHeader';
import {
  CreateRoomPage,
  HomePage,
  Layout,
  NotFoundPage,
  ProblemSharePage,
  ProblemSolvePage,
  ProfilePage,
  RoomPage,
  SignUpPage,
  WelcomePage,
} from '@/pages';

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
    element: <Layout header={<Header />} />,
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
    element: <Layout header={<PSHeader />} />,
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
