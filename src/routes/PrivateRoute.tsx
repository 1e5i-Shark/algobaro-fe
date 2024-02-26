import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: ReactNode;
}

export default function PrivateRoute({
  component: Component,
}: PrivateRouteProps) {
  const auth = true;

  // 추후 전역 store에서 유저가 로그인 했는지 확인하는 로직으로 변경
  // ex) const isLoggedIn = useGlobalStore(state => state.exampleNum);

  return auth ? Component : <Navigate to="/" />;
}
