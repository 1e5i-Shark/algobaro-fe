import { Outlet } from 'react-router-dom';

import { Header } from '@/components';

import * as S from './MainPage.style';

export default function MainPage() {
  return (
    <>
      <Header />
      <S.OutletWrapper>
        <Outlet />
      </S.OutletWrapper>
    </>
  );
}
