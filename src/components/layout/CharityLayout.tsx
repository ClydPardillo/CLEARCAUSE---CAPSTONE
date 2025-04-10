
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListChecks, BadgeCheck, DollarSign, Landmark, LogOut, PlusCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

interface CharityLayoutProps {
  children: React.ReactNode;
  title: string;
}

const CharityLayout: React.FC<CharityLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  
  const navItems = [
    { 
      path: '/charity/dashboard', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      path: '/charity/campaigns', 
      label: 'Manage Campaigns', 
      icon: <ListChecks className="w-5 h-5" /> 
    },
    { 
      path: '/charity/verifications', 
      label: 'Verification Status', 
      icon: <BadgeCheck className="w-5 h-5" /> 
    },
    { 
      path: '/charity/funds', 
      label: 'Funds Management', 
      icon: <DollarSign className="w-5 h-5" /> 
    },
    { 
      path: '/charity/profile', 
      label: 'Organization Profile', 
      icon: <Landmark className="w-5 h-5" /> 
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow flex flex-col md:flex-row bg-clearcause-background">
        {/* Sidebar */}
        <aside className="bg-white w-full md:w-64 md:min-h-[calc(100vh-4rem)] shadow-sm">
          <div className="p-4 md:p-6 h-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 hidden md:block">Charity Portal</h2>
            
            <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-visible py-2 md:py-0">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${isActive 
                      ? 'bg-clearcause-primary/10 text-clearcause-primary' 
                      : 'text-gray-600 hover:text-clearcause-primary hover:bg-gray-100'
                    }
                  `}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </NavLink>
              ))}
              
              <NavLink
                to="/login"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-500 hover:bg-red-50 mt-8 md:mt-auto"
              >
                <LogOut className="w-5 h-5" />
                <span className="ml-3">Logout</span>
              </NavLink>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-grow p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{title}</h1>
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default CharityLayout;
