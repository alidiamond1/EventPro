import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const publicNavItems = [
    { name: 'Home', path: '/' },
  ];

  const protectedNavItems = [
    { name: 'Venues & Vendors', path: '/venues' },
    { name: 'Event Planner', path: '/planner' },
    { name: 'Guest List', path: '/guests' },
    { name: 'Theme Ideas', path: '/themes' },
  ];

  const navItems = user ? [...publicNavItems, ...protectedNavItems] : publicNavItems;

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const ThemeToggleButton = () => (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
              EventPro
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center ml-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}
              <div className="ml-4">
                <ThemeToggleButton />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div className="mr-2">
              <ThemeToggleButton />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActivePath(item.path)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                      : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <div className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {user.name}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
        {children}
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} EventPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;