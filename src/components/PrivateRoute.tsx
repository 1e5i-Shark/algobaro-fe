import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: ReactNode;
}

export default function PrivateRoute({
  component: Component,
}: PrivateRouteProps) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // 로그인에 대한 유효성 검증 코드
    setAuthenticated(true);
  });

  return authenticated ? Component : <Navigate to="/"></Navigate>;
}
