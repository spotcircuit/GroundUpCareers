import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { HardHat, FilePlus2, Users, Briefcase, Clock } from 'lucide-react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'post-job';

  const navItems = [
    { 
      path: 'post-job', 
      label: 'Post New Job', 
      icon: <FilePlus2 size={20} /> 
    },
    { 
      path: 'candidates', 
      label: 'Review Candidates', 
      icon: <Users size={20} /> 
    },
    { 
      path: 'manage-jobs', 
      label: 'Manage Jobs', 
      icon: <Briefcase size={20} /> 
    },
    { 
      path: 'staging', 
      label: 'Job Staging', 
      icon: <Clock size={20} /> 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1 pt-16">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-neutral-800 text-white hidden md:block">
          <div className="p-4 border-b border-neutral-700 flex items-center gap-2">
            <HardHat size={24} className="text-secondary-500" />
            <span className="font-semibold font-display">Dashboard</span>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={`/dashboard/${item.path}`}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        isActive
                          ? 'bg-primary-700 text-white'
                          : 'text-neutral-300 hover:bg-neutral-700 hover:text-white'
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile Navigation */}
        <div className="md:hidden bg-white border-b border-neutral-200 w-full overflow-x-auto">
          <div className="flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={`/dashboard/${item.path}`}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center px-4 py-3 whitespace-nowrap ${
                    isActive
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-neutral-600 hover:text-primary-600'
                  }`
                }
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-neutral-50 p-6">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;