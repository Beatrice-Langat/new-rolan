'use client';



import { useRouter, usePathname } from 'next/navigation';

type AppSection = 'examination' | 'registration' | 'view-reports' | 'settings' | 'analysis';

interface NavigationItem {
  id: AppSection;
  label: string;
  icon: string;
  path: string;
}

interface SidebarProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}

export default function Sidebar({ sidebarOpen, onSidebarToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    { id: 'examination', label: 'Examination', icon: '🧪', path: '/examination' },
    { id: 'registration', label: 'Registration', icon: '📝', path: '/registration' },
    { id: 'view-reports', label: 'View Reports', icon: '📊', path: '/view-reports' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
    { id: 'analysis', label: 'Analysis', icon: '📊', path: '/analysis-menu' },
  ];
  

  const handleSectionChange = (path: string) => {
    router.push(path);
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onSidebarToggle();
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onSidebarToggle}
        />
      )}

      {/* Sidebar - Primary Navigation */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
         

          {/* Sidebar Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.path)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary-400 border-l-4 border-primary dark:border-primary-400'
                    : ' dark:text-white hover:text-primary dark:hover:text-primary-400 hover:bg-primary/10 dark:hover:bg-primary/20'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-paragraph">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-primary/20 dark:border-primary/40">
            <div className="text-xs font-paragraph /60 dark:text-gray-400 text-center">
              Rolan Exam Master
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

