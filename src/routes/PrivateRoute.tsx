import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useMessageStore from '@/store/MessageStore';

import { CheckUserLogin } from './CheckUserLogin';
import { PATH } from './path';

interface PrivateRouteProps {
  component: ReactNode;
}

export default function PrivateRoute({
  component: Component,
}: PrivateRouteProps) {
  const { pathname } = useLocation();
  const { connected, disconnect } = useMessageStore();

  if (pathname === PATH.HOME) {
    connected && disconnect();
  }

  // 1차적으로 로컬 스토리지에서 accessToken를 확인한다.
  // 추후 전역 store에서 유저가 로그인 했는지 확인하는 로직으로 변경
  // ex) const isLoggedIn = useGlobalStore(state => state.exampleNum);
  const auth = CheckUserLogin();

  return auth ? Component : <Navigate to="/" />;
}
