import React, { useState, useEffect } from 'react';
// Mock Link and useLocation for demo purposes
const Link = ({ to, children, ...props }) => (
  <a href={to} {...props}>{children}</a>
);
const useLocation = () => ({ pathname: '/' });

import { 
  Home, Heart, BarChart3, BookOpen, Info, Mail, 
  LogIn, UserPlus, User, Settings, LogOut, Moon, Sun, 
  Menu, X, ChevronDown, TrendingUp, Bell, Calendar,
  PlusCircle, Eye, Brain, Users, Award, MessageCircle
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load theme preference from localStorage
    const saved = localStorage.getItem('mindlog-theme');
    return saved ? JSON.parse(saved) : false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Khushi');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  // Enhanced navigation structure with dropdowns
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { 
      path: '/features', 
      label: 'Features', 
      icon: Heart,
      dropdown: [
        // { path: '/features/mood-tracking', label: 'Mood Tracking', icon: Heart },
        // { path: '/features/visualizations', label: 'Data Insights', icon: TrendingUp },
        { path: '/features/reminders', label: 'Daily Reminders', icon: Bell },
        { path: '/features/calendar', label: 'Mood Calendar', icon: Calendar }
      ]
    },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { 
      path: '/journal', 
      label: 'Journal', 
      icon: BookOpen,
      dropdown: [
        { path: '/journal/entries', label: 'View Entries', icon: Eye },
        { path: '/journal/new', label: 'Add New Entry', icon: PlusCircle },
        // { path: '/journal/insights', label: 'Mood Insights', icon: Brain }
      ]
    },
    { 
      path: '/about', 
      label: 'About', 
      icon: Info,
      // dropdown: [
      //   { path: '/about/story', label: 'What We Do', icon: BookOpen },
      //   // { path: '/about/team', label: 'Team', icon: Users },
      //   // { path: '/about/testimonials', label: 'Testimonials', icon: Award }
      // ]
    },
    // { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const userMenuItems = [
    { label: 'Profile', icon: User, action: () => console.log('Go to profile') },
    { label: 'Settings', icon: Settings, action: () => console.log('Go to settings') },
    { label: 'Logout', icon: LogOut, action: () => setIsLoggedIn(false) },
  ];

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('mindlog-theme', JSON.stringify(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.body.style.backgroundColor = isDarkMode ? '#1f2937' : '#ffffff';
  }, [isDarkMode]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen, isUserDropdownOpen, activeDropdown]);

  const handleDropdownToggle = (itemLabel) => {
    setActiveDropdown(activeDropdown === itemLabel ? null : itemLabel);
  };

  const smoothScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const AuthModal = () => (
    showAuthModal && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <button
            onClick={closeAuthModal}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <X size={20} />
          </button>
          
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={28} />
              </div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {authMode === 'login' ? 'Welcome Back' : 'Join MindLog'}
              </h2>
            </div>

            <div className="flex rounded-lg p-1 mb-6 bg-gray-100 dark:bg-gray-700">
              {['login', 'register'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAuthMode(mode)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    authMode === mode
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {mode === 'login' ? 'Login' : 'Register'}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500'
                } focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
              />
              <input
                type="password"
                placeholder="Password"
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500'
                } focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
              />
              {authMode === 'register' && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500'
                  } focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
                />
              )}
              
              <button
                onClick={() => {
                  setIsLoggedIn(true);
                  closeAuthModal();
                }}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:scale-[1.02]"
              >
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <>
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/90 border-gray-700 shadow-lg shadow-purple-500/10' 
          : 'bg-white/90 border-gray-200 shadow-lg shadow-pink-500/10'
      }`}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center py-4">

            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-pink-500/30 transition-all duration-300">
                <Heart className="text-white animate-pulse" size={20} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                MindLog
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map(({ path, label, icon: Icon, dropdown }) => (
                <div key={path} className="relative dropdown-container">
                  {dropdown ? (
                    // Dropdown Menu Item
                    <button
                      onClick={() => handleDropdownToggle(label)}
                      onMouseEnter={() => setActiveDropdown(label)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 group ${
                        activeDropdown === label
                          ? `${isDarkMode ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'}`
                          : `${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`
                      }`}
                    >
                      <Icon size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-medium">{label}</span>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    // Regular Menu Item
                    <Link
                      to={path}
                      onClick={(e) => {
                        if (path === '/' && location.pathname === '/') {
                          e.preventDefault();
                          smoothScrollToSection('home');
                        }
                      }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 group ${
                        location.pathname === path
                          ? `${isDarkMode ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'}`
                          : `${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`
                      }`}
                    >
                      <Icon size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-medium">{label}</span>
                    </Link>
                  )}

                  {/* Dropdown Content */}
                  {dropdown && activeDropdown === label && (
                    <div 
                      className={`absolute top-full left-0 mt-2 w-56 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-2 ${
                        isDarkMode 
                          ? 'bg-gray-800/95 border-gray-700' 
                          : 'bg-white/95 border-gray-200'
                      }`}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {dropdown.map(({ path, label: dropLabel, icon: DropIcon }) => (
                        <Link
                          key={path}
                          to={path}
                          onClick={() => setActiveDropdown(null)}
                          className={`flex items-center space-x-3 px-4 py-3 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl group ${
                            isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <DropIcon size={16} className="group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{dropLabel}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md'
                }`}
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* User Authentication */}
              {isLoggedIn ? (
                <div className="relative user-dropdown-container">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-white hover:bg-gray-700 shadow-lg' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:block font-medium">{userName}</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown */}
                  {isUserDropdownOpen && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-2 ${
                      isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700' 
                        : 'bg-white/90 border-gray-200'
                    }`}>
                      {userMenuItems.map(({ label, icon: Icon, action }) => (
                        <button
                          key={label}
                          onClick={() => {
                            action();
                            setIsUserDropdownOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl group ${
                            isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <Icon size={16} className="group-hover:scale-110 transition-transform duration-200" />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <button
                    onClick={() => openAuthModal('login')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:scale-105"
                  >
                    <UserPlus size={18} />
                    <span>Register</span>
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-300 mobile-menu-container ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className={`lg:hidden border-t backdrop-blur-md mobile-menu-container transition-all duration-300 ${
              isDarkMode ? 'border-gray-700 bg-gray-900/95' : 'border-gray-200 bg-white/95'
            }`}>
              <div className="py-4 space-y-2">
                {navItems.map(({ path, label, icon: Icon, dropdown }) => (
                  <div key={path}>
                    {dropdown ? (
                      <>
                        <button
                          onClick={() => handleDropdownToggle(`mobile-${label}`)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                            isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon size={20} />
                            <span className="font-medium">{label}</span>
                          </div>
                          <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === `mobile-${label}` ? 'rotate-180' : ''}`} />
                        </button>
                        {activeDropdown === `mobile-${label}` && (
                          <div className="ml-4 mt-2 space-y-1">
                            {dropdown.map(({ path, label: dropLabel, icon: DropIcon }) => (
                              <Link
                                key={path}
                                to={path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                                  isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                              >
                                <DropIcon size={18} />
                                <span>{dropLabel}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          location.pathname === path
                            ? `${isDarkMode ? 'bg-purple-600 text-white' : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'}`
                            : `${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{label}</span>
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Mobile Auth Buttons */}
                {!isLoggedIn && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <button
                      onClick={() => openAuthModal('login')}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <LogIn size={20} />
                      <span className="font-medium">Login</span>
                    </button>
                    <button
                      onClick={() => openAuthModal('register')}
                      className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-300"
                    >
                      <UserPlus size={20} />
                      <span>Register</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal />
    </>
  );
};

export default Navbar;