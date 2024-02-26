import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import * as S from './Layout.style';

interface LayoutProps {
  header?: ReactNode;
}

export default function Layout({ header }: LayoutProps) {
  return (
    <>
      {header && header}
      <S.OutletWrapper>
        <Outlet />
      </S.OutletWrapper>
    </>
  );
}
