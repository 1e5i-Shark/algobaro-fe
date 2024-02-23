import { createBrowserRouter, Outlet } from 'react-router-dom';

import Header from '@/components/Common/Header/Header';
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

export const router = createBrowserRouter([
  { path: PATH.ROOT, element: <WelcomePage /> },
  { path: `${PATH.ROOM}/:roomId`, element: <RoomPage /> },
  {
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { path: PATH.HOME, element: <HomePage /> },
      { path: PATH.SIGNUP, element: <SignUpPage /> },
      { path: `${PATH.PROFILE}/:userId`, element: <ProfilePage /> },
      { path: PATH.CREATEROOM, element: <CreateRoomPage /> },
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
      { path: `${PATH.PROBLEMSOLVE}/:roomId`, element: <ProblemSolvePage /> },
      { path: `${PATH.PROBLEMSHARE}/:roomId`, element: <ProblemSharePage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
