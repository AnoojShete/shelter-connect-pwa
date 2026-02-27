import { useState } from 'react';
import { Menu, X, Home, List, AlertTriangle, Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/shelters', label: 'Find Shelters', icon: List },
    { path: '/emergency', label: 'Emergency Help', icon: AlertTriangle },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-2 min-h-[44px]"
          aria-label="Go to home"
        >
          <div className="w-8 h-8 bg-[#0F52BA] rounded-lg flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2L3 7V17H8V12H12V17H17V7L10 2Z"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
            ShelterConnect
          </span>
        </button>

        <div className="flex items-center gap-1">
          <button
            className="h-11 w-11 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Change language"
          >
            <Globe className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="h-11 w-11 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="absolute top-[57px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center gap-3 px-5 py-4 min-h-[52px] transition-colors ${
                    isActive
                      ? 'bg-[#E0F7FA] text-[#0F52BA]'
                      : 'text-gray-700 hover:bg-gray-50'
                  } ${item.path === '/emergency' ? 'text-[#D32F2F]' : ''}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </>
      )}
    </>
  );
}
