import { Outlet } from 'react-router';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function Layout() {
  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-xl relative">
      <Header />
      <main>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
