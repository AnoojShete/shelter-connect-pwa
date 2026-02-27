import { Home, Search, AlertTriangle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/shelters', label: 'Shelters', icon: Search },
    { path: '/emergency', label: 'Emergency', icon: AlertTriangle, isEmergency: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 max-w-md mx-auto">
      <div className="flex items-stretch">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path ||
            (tab.path === '/shelters' && location.pathname.startsWith('/shelter'));

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 min-h-[56px] transition-colors relative ${
                tab.isEmergency && isActive
                  ? 'text-[#D32F2F]'
                  : isActive
                  ? 'text-[#0F52BA]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`h-6 w-6 ${tab.isEmergency && !isActive ? 'text-[#D32F2F]/70' : ''}`} />
              <span className="text-xs">{tab.label}</span>
              {isActive && (
                <div
                  className={`absolute top-0 h-0.5 w-12 rounded-b ${
                    tab.isEmergency ? 'bg-[#D32F2F]' : 'bg-[#0F52BA]'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}