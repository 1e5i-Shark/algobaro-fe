import { Outlet } from 'react-router-dom';

import Header from '@/components/Common/Header/Header';
import PSHeader from '@/components/Common/Header/PSHeader';

interface LayoutProps {
  kind?: 'default' | 'ps';
}

export default function Layout({ kind = 'default' }: LayoutProps) {
  return (
    <>
      {kind === 'default' ? <Header /> : <PSHeader />}
      <Outlet />
    </>
  );
}
