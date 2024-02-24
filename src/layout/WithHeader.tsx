import { Outlet } from 'react-router-dom';

import Header from '@/components/Common/Header/Header';

export default function WithHeader() {
  return (
    <>
      {/* 이곳에 Header 컴포넌트를 추가해 주세요. */}
      <Header />
      <Outlet />
    </>
  );
}
