import React, { useState, useEffect } from 'react';
import { Plus, Clock, Trash2, Bell, BellRing, Check, X, Heart, Sparkles, Moon, Sun } from 'lucide-react';

const DailyReminders = () => {
  const [reminders, setReminders] = useState([
    { id: 1, time: '09:00', message: 'Morning mood check-in', enabled: true, category: 'morning' },
    { id: 2, time: '18:00', message: 'Evening reflection time', enabled: true, category: 'evening' },
    { id: 3, time: '21:00', message: 'End of day mood log', enabled: false, category: 'night' },
  ]);

  const [newReminder, setNewReminder] = useState({ time: '', message: '', category: 'general' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addReminder = () => {
    if (!newReminder.time || !newReminder.message) {
      showToast('Please fill in both time and message', 'error');
      return;
    }

    const reminder = {
      id: Date.now(),
      time: newReminder.time,
      message: newReminder.message,
      category: newReminder.category,
      enabled: true
    };

    setReminders(prev => [...prev, reminder]);
    setNewReminder({ time: '', message: '', category: 'general' });
    setShowAddForm(false);
    showToast('Reminder added successfully! 🎉');
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
    showToast('Reminder deleted');
  };

  const toggleReminder = (id) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
    const reminder = reminders.find(r => r.id === id);
    showToast(reminder?.enabled ? 'Reminder disabled' : 'Reminder enabled');
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'morning': return <Sun className="text-yellow-500" size={24} />;
      case 'evening': return <Moon className="text-indigo-500" size={24} />;
      case 'night': return <Moon className="text-purple-500" size={24} />;
      default: return <Sparkles className="text-pink-500" size={24} />;
    }
  };

  const getCategoryStyles = (category, enabled) => {
    const baseStyles = "p-2 rounded-xl";
    
    if (!enabled) {
      return {
        iconBg: `${baseStyles} bg-gray-100 dark:bg-gray-700`,
        cardBorder: 'border-l-4 border-gray-300',
        cardBg: 'bg-white/60 dark:bg-gray-800/60'
      };
    }
    
    switch (category) {
      case 'morning':
        return {
          iconBg: `${baseStyles} bg-yellow-100 dark:bg-yellow-900/30`,
          cardBorder: 'border-l-4 border-yellow-400',
          cardBg: 'bg-yellow-50/80 dark:bg-yellow-900/10'
        };
      case 'evening':
        return {
          iconBg: `${baseStyles} bg-indigo-100 dark:bg-indigo-900/30`,
          cardBorder: 'border-l-4 border-indigo-400',
          cardBg: 'bg-indigo-50/80 dark:bg-indigo-900/10'
        };
      case 'night':
        return {
          iconBg: `${baseStyles} bg-purple-100 dark:bg-purple-900/30`,
          cardBorder: 'border-l-4 border-purple-400',
          cardBg: 'bg-purple-50/80 dark:bg-purple-900/10'
        };
      default:
        return {
          iconBg: `${baseStyles} bg-pink-100 dark:bg-pink-900/30`,
          cardBorder: 'border-l-4 border-pink-400',
          cardBg: 'bg-pink-50/80 dark:bg-pink-900/10'
        };
    }
  };

  const categories = [
    { value: 'morning', label: 'Morning', icon: <Sun size={16} className="text-yellow-500" /> },
    { value: 'evening', label: 'Evening', icon: <Moon size={16} className="text-indigo-500" /> },
    { value: 'night', label: 'Night', icon: <Moon size={16} className="text-purple-500" /> },
    { value: 'general', label: 'General', icon: <Sparkles size={16} className="text-pink-500" /> }
  ];

  const getStatCardStyles = (type) => {
    switch (type) {
      case 'total':
        return {
          iconBg: 'bg-gradient-to-r from-pink-500 to-purple-600',
          textColor: 'text-pink-500'
        };
      case 'active':
        return {
          iconBg: 'bg-gradient-to-r from-green-500 to-green-600',
          textColor: 'text-green-500'
        };
      case 'next':
        return {
          iconBg: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
          textColor: 'text-indigo-500'
        };
      default:
        return {
          iconBg: 'bg-gradient-to-r from-gray-500 to-gray-600',
          textColor: 'text-gray-500'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-purple-400 to-indigo-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-5 animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div 
          id="header" 
          data-animate 
          className={`text-center mb-12 transition-all duration-1000 ${isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6">
            <Bell className="text-white" size={32} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-[1.3]">
            Daily Reminders
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay consistent with your emotional well-being journey through gentle, timely reminders
          </p>
        </div>

        {/* Stats Overview */}
        <div 
          id="stats" 
          data-animate 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-1000 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 ${getStatCardStyles('total').iconBg} rounded-xl flex items-center justify-center`}>
                <Bell className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Total Reminders</h3>
            </div>
            <p className={`text-3xl font-bold ${getStatCardStyles('total').textColor}`}>{reminders.length}</p>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 ${getStatCardStyles('active').iconBg} rounded-xl flex items-center justify-center`}>
                <BellRing className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Active Reminders</h3>
            </div>
            <p className={`text-3xl font-bold ${getStatCardStyles('active').textColor}`}>{reminders.filter(r => r.enabled).length}</p>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 ${getStatCardStyles('next').iconBg} rounded-xl flex items-center justify-center`}>
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Next Reminder</h3>
            </div>
            <p className={`text-3xl font-bold ${getStatCardStyles('next').textColor}`}>
              {reminders.filter(r => r.enabled).length > 0 ? 
                formatTime(reminders.filter(r => r.enabled).sort((a, b) => a.time.localeCompare(b.time))[0]?.time || '00:00') : 
                'None'
              }
            </p>
          </div>
        </div>

        {/* Reminder List */}
        <div 
          id="reminders" 
          data-animate 
          className={`space-y-6 mb-12 transition-all duration-1000 ${isVisible.reminders ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {reminders.map((reminder, index) => {
            const styles = getCategoryStyles(reminder.category, reminder.enabled);
            return (
              <div
                key={reminder.id}
                className={`group ${styles.cardBg} ${styles.cardBorder} backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transform`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className={styles.iconBg}>
                        {getCategoryIcon(reminder.category)}
                      </div>
                      <div className={styles.iconBg}>
                        {reminder.enabled ? (
                          <BellRing className="text-pink-500" size={24} />
                        ) : (
                          <Bell className="text-gray-400" size={24} />
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{formatTime(reminder.time)}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">{reminder.message}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 capitalize">{reminder.category} reminder</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleReminder(reminder.id)}
                      className={`px-6 py-3 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105 ${
                        reminder.enabled 
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700' 
                          : 'bg-gray-400 hover:bg-gray-500'
                      }`}
                    >
                      {reminder.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                    <button 
                      onClick={() => deleteReminder(reminder.id)} 
                      className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 hover:scale-110"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Reminder Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 flex items-center mx-auto"
          >
            {showAddForm ? (
              <>
                <X className="mr-2 group-hover:rotate-90 transition-transform duration-300" size={24} />
                Cancel
              </>
            ) : (
              <>
                <Plus className="mr-2 group-hover:rotate-90 transition-transform duration-300" size={24} />
                Add New Reminder
              </>
            )}
          </button>
        </div>

        {/* Add Reminder Form */}
        {showAddForm && (
          <div 
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto mb-8 transform transition-all duration-500 animate-in slide-in-from-bottom-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Create New Reminder
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Set up a gentle nudge for your mindfulness journey</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3 text-lg">Reminder Time</label>
                <input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-2xl focus:border-pink-400 focus:outline-none transition-all duration-300 text-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3 text-lg">Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setNewReminder({ ...newReminder, category: category.value })}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                        newReminder.category === category.value
                          ? 'border-pink-400 bg-pink-50 dark:bg-pink-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-pink-300 hover:bg-pink-25 dark:hover:bg-pink-900/10'
                      }`}
                    >
                      {category.icon}
                      <span className="font-medium text-gray-700 dark:text-gray-300">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3 text-lg">Reminder Message</label>
                <input
                  type="text"
                  placeholder="Enter your personalized reminder message..."
                  value={newReminder.message}
                  onChange={(e) => setNewReminder({ ...newReminder, message: e.target.value })}
                  className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-2xl focus:border-pink-400 focus:outline-none transition-all duration-300 text-lg"
                />
              </div>

              <button
                onClick={addReminder}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Plus size={24} />
                <span>Create Reminder</span>
              </button>
            </div>
          </div>
        )}

        {/* Motivational Quote */}
        <div className="text-center mt-16 mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl max-w-3xl mx-auto">
            <Heart className="mx-auto mb-4" size={48} />
            <p className="text-2xl font-light italic mb-4">
              "Small, consistent actions create lasting change. Your daily reminders are gentle steps toward emotional well-being."
            </p>
            <p className="text-pink-200 font-semibold">- MindLog Team</p>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50">
            <div
              className={`px-6 py-4 rounded-2xl text-white shadow-2xl transform transition-all duration-500 flex items-center space-x-3 ${
                toast.type === 'error' 
                  ? 'bg-gradient-to-r from-red-500 to-red-600' 
                  : 'bg-gradient-to-r from-green-500 to-green-600'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                {toast.type === 'error' ? (
                  <X className="text-white" size={16} />
                ) : (
                  <Check className="text-white" size={16} />
                )}
              </div>
              <span className="font-medium">{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyReminders;