import { ReactNode } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';

interface PrivateRouteProps {
  component: ReactNode;
}

export default function PrivateRoute({
  component: Component,
}: PrivateRouteProps) {
  const authenticated = useLoaderData();

  return authenticated ? Component : <Navigate to="/" />;
}
