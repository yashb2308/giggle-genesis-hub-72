
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Image,
  TrendingUp,
  Home,
  Info
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollToSection('about');
    } else {
      window.location.href = '/#about';
    }
    setIsOpen(false);
  };

  const publicNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Gallery', path: '/memes', icon: Image },
    { name: 'Trending', path: '/trending', icon: TrendingUp },
    { name: 'About', path: '#about', icon: Info, onClick: handleAboutClick },
  ];

  const protectedNavItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Templates', path: '/templates' },
  ];

  return (
    <nav className="w-full bg-black border-b border-white/10 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8">
            {publicNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name}>
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors font-light"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors font-light"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
            
            {isAuthenticated && protectedNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors font-light"
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {publicNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name}>
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="flex items-center space-x-2 px-3 py-2 text-white hover:bg-white/5 rounded-md font-light w-full text-left"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="flex items-center space-x-2 px-3 py-2 text-white hover:bg-white/5 rounded-md font-light"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
            
            {isAuthenticated && protectedNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-2 px-3 py-2 text-white hover:bg-white/5 rounded-md font-light"
                onClick={() => setIsOpen(false)}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
