import { Outlet } from 'react-router-dom';

export default function Main() {
  return (
    <>
      <header>Main's Header</header>
      <Outlet />
    </>
  );
}
