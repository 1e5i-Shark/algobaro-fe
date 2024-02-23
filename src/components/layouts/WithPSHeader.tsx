import { Outlet } from 'react-router-dom';

import PSHeader from '@/components/Common/Header/PSHeader';

export default function WithPSHeader() {
  return (
    <>
      {/* 이곳에 PSHeader 컴포넌트를 추가해 주세요. */}
      <PSHeader />
      <Outlet />
    </>
  );
}
