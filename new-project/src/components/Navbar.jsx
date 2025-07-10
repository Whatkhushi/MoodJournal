import React, { useState, useEffect } from 'react';
import { 
  Home, Heart, BarChart3, BookOpen, Info, Mail, 
  LogIn, UserPlus, User, Settings, LogOut, Moon, Sun, 
  Menu, X, ChevronDown, TrendingUp, Bell, Calendar,
  PlusCircle, Eye, Brain, Users, Award, MessageCircle
} from 'lucide-react';

// Improved Link component with proper client-side navigation
const Link = ({ to, children, onClick, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    if (onClick) onClick(e);
    // Only update if we're not already on this path
    if (window.location.pathname !== to) {
      window.history.pushState({}, '', to);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo(0, 0);
    }
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

// Custom hook to track location
const useLocation = () => {
  const [pathname, setPathname] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return { pathname };
};

const Navbar = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Khushi');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Navigation structure
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { 
      path: '/features', 
      label: 'Features', 
      icon: Heart,
      dropdown: [
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
      ]
    },
    { path: '/about', label: 'About', icon: Info },
  ];

  const userMenuItems = [
    { label: 'Profile', icon: User, action: () => console.log('Go to profile') },
    { label: 'Settings', icon: Settings, action: () => console.log('Go to settings') },
    { label: 'Logout', icon: LogOut, action: () => setIsLoggedIn(false) },
  ];

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
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
    setActiveDropdown(prev => prev === itemLabel ? null : itemLabel);
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
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsMobileMenuOpen(false);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'register' && password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoggedIn(true);
    setUserName(email.split('@')[0]);
    closeAuthModal();
  };

  const AuthModal = () => (
    showAuthModal && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-4xl mx-4 h-3/4 rounded-3xl shadow-2xl overflow-hidden">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
          >
            <X size={20} />
          </button>
          
          <div className="flex h-full">
            <div className="w-2/5 bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center rounded-l-3xl">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <Heart className="text-white animate-pulse" size={48} />
                </div>
                <h2 className="text-3xl font-bold mb-2">Welcome to MindLog</h2>
                <p className="text-pink-100 text-lg">Track your emotions, improve your wellbeing</p>
              </div>
            </div>

            <div className={`w-3/5 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-pink-50 to-purple-50'} rounded-r-3xl`}>
              <form onSubmit={handleAuthSubmit} className="h-full w-full p-10 flex flex-col">
                <div className="h-[20%] w-full flex items-center justify-center mb-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Heart className="text-white" size={28} />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        MindLog
                      </h1>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {authMode === 'login' ? 'Welcome Back' : 'Join MindLog'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex rounded-lg p-1 mb-6 bg-gray-100 dark:bg-gray-700">
                  {['login', 'register'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
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

                <div className="h-[20%] w-full mb-4">
                  <label className={`text-lg font-semibold mb-1 block ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Email
                  </label>
                  <div className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-xl border border-gray-200 dark:border-gray-600">
                    <Mail className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ml-2`} size={18} />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-1 ml-3 text-md bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="h-[20%] w-full mb-4">
                  <label className={`text-lg font-semibold mb-1 block ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Password
                  </label>
                  <div className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-xl border border-gray-200 dark:border-gray-600">
                    <Settings className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ml-2`} size={18} />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full p-1 ml-3 text-md bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {authMode === 'login' && (
                    <div className="flex justify-end mt-2">
                      <button type="button" className="text-sm text-pink-600 dark:text-pink-400 font-semibold hover:underline">
                        Forgot Password?
                      </button>
                    </div>
                  )}
                </div>

                {authMode === 'register' && (
                  <div className="h-[20%] w-full mb-4">
                    <label className={`text-lg font-semibold mb-1 block ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Confirm Password
                    </label>
                    <div className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-xl border border-gray-200 dark:border-gray-600">
                      <Settings className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ml-2`} size={18} />
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full p-1 ml-3 text-md bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="h-[10%] w-full mt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold text-xl flex justify-center items-center p-3 shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    {authMode === 'login' ? 'Login' : 'Create Account'}
                  </button>
                </div>

                <div className="w-full flex-1 flex flex-col justify-center">
                  <div className="w-full flex items-center mt-6 mb-4">
                    <hr className={`flex-grow border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
                    <h2 className={`mx-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Or Continue With
                    </h2>
                    <hr className={`flex-grow border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
                  </div>
                  
                  <div className="flex justify-center space-x-6 mb-4">
                    <button type="button" className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-sm">G</span>
                    </button>
                    <button type="button" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-sm">f</span>
                    </button>
                    <button type="button" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-sm">⚪</span>
                    </button>
                  </div>

                  <div className="w-full flex justify-center items-center">
                    <span className={`font-bold text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                      className="text-pink-600 dark:text-pink-400 font-semibold text-sm hover:underline ml-1 cursor-pointer"
                    >
                      {authMode === 'login' ? 'Sign Up here!' : 'Login here!'}
                    </button>
                  </div>
                </div>
              </form>
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

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map(({ path, label, icon: Icon, dropdown }) => (
                <div key={path} className="relative dropdown-container">
                  {dropdown ? (
                    <button
                      onClick={() => handleDropdownToggle(label)}
                      onMouseEnter={() => setActiveDropdown(label)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleDropdownToggle(label);
                        }
                      }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 group ${
                        activeDropdown === label
                          ? `${isDarkMode ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'}`
                          : `${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`
                      }`}
                      aria-expanded={activeDropdown === label}
                      aria-haspopup="true"
                    >
                      <Icon size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-medium">{label}</span>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
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

                  {dropdown && activeDropdown === label && (
                    <div 
                      className={`absolute top-full left-0 mt-2 w-56 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-2 ${
                        isDarkMode 
                          ? 'bg-gray-800/95 border-gray-700' 
                          : 'bg-white/95 border-gray-200'
                      }`}
                      onMouseLeave={() => setActiveDropdown(null)}
                      role="menu"
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
                          role="menuitem"
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

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md'
                }`}
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                aria-label={`Toggle ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {isLoggedIn ? (
                <div className="relative user-dropdown-container">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setIsUserDropdownOpen(!isUserDropdownOpen);
                      }
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-white hover:bg-gray-700 shadow-lg' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
                    }`}
                    aria-expanded={isUserDropdownOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:block font-medium">{userName}</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserDropdownOpen && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-2 ${
                      isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700' 
                        : 'bg-white/90 border-gray-200'
                    }`}
                    role="menu"
                    >
                      {userMenuItems.map(({ label, icon: Icon, action }) => (
                        <button
                          key={label}
                          onClick={() => {
                            action();
                            setIsUserDropdownOpen(false);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              action();
                              setIsUserDropdownOpen(false);
                            }
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl group ${
                            isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                          role="menuitem"
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

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-300 mobile-menu-container ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <div className={`lg:hidden border-t backdrop-blur-md mobile-menu-container transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[1000px]' : 'max-h-0'
          } ${
            isDarkMode ? 'border-gray-700 bg-gray-900/95' : 'border-gray-200 bg-white/95'
          }`}>
            <div className="py-4 space-y-2">
              {navItems.map(({ path, label, icon: Icon, dropdown }) => (
                <div key={path}>
                  {dropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(`mobile-${label}`)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleDropdownToggle(`mobile-${label}`);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                          isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                        aria-expanded={activeDropdown === `mobile-${label}`}
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
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setActiveDropdown(null);
                              }}
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
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setActiveDropdown(null);
                      }}
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
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
                  >
                    <UserPlus size={20} />
                    <span className="font-medium">Register</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {AuthModal()}
    </>
  );
};

export default Navbar;