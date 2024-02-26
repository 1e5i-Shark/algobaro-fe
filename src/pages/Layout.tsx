import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  header?: ReactNode;
}

export default function Layout({ header }: LayoutProps) {
  return (
    <>
      {header && header}
      <Outlet />
    </>
  );
}
