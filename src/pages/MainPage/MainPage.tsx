import { Outlet } from 'react-router-dom';

export default function MainPage() {
  return (
    <>
      <header>MainPage's Header</header>
      <Outlet />
    </>
  );
}
