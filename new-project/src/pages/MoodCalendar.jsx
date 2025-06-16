import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, X, Clock, Tag, Bed, Heart, Sparkles, BarChart3, TrendingUp, Award, Flame, Target, Moon, Sun, Activity, Coffee, Star, Zap } from 'lucide-react';

const MoodCalendar = ({ entries = [], onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [calendarStats, setCalendarStats] = useState({});

  const moodEmojis = {
    'Happy': '😊',
    'Sad': '😔',
    'Calm': '😌',
    'Anxious': '😰',
    'Tired': '😴',
    'Thoughtful': '🤔',
    'Angry': '😡',
    'Loved': '🥰',
    'Grateful': '🤗',
    'Confident': '😎',
    'Unwell': '🤒',
    'Excited': '🥳'
  };

  const getHeatmapIntensity = (score, entryCount) => {
    if (!score) return 'bg-gray-100 dark:bg-gray-800';
    
    const baseIntensity = Math.floor(score / 2.5); // 0-4 scale
    const countBonus = Math.min(entryCount - 1, 2); // Max 2 bonus levels
    const totalIntensity = Math.min(baseIntensity + countBonus, 4);
    
    const intensityClasses = [
      'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      'bg-orange-200 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700',
      'bg-yellow-300 dark:bg-yellow-900/40 border-yellow-400 dark:border-yellow-600',
      'bg-green-300 dark:bg-green-900/40 border-green-400 dark:border-green-600',
      'bg-emerald-400 dark:bg-emerald-900/50 border-emerald-500 dark:border-emerald-500'
    ];
    
    return intensityClasses[totalIntensity] || intensityClasses[0];
  };

  const getHeatmapGlow = (score) => {
    if (!score) return '';
    if (score >= 9) return 'shadow-lg shadow-emerald-300/50 dark:shadow-emerald-500/30';
    if (score >= 7) return 'shadow-md shadow-green-300/40 dark:shadow-green-500/20';
    if (score >= 5) return 'shadow-sm shadow-yellow-300/30 dark:shadow-yellow-500/15';
    return '';
  };

  useEffect(() => {
    setIsVisible(true);
    calculateCalendarStats();
  }, [entries, currentDate]);

  const calculateCalendarStats = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const monthEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    });

    const stats = {
      totalEntries: monthEntries.length,
      avgScore: monthEntries.length > 0 ? (monthEntries.reduce((sum, entry) => sum + (entry.score || 0), 0) / monthEntries.length).toFixed(1) : 0,
      bestDay: monthEntries.reduce((best, entry) => entry.score > (best?.score || 0) ? entry : best, null),
      activeDays: new Set(monthEntries.map(entry => entry.date)).size,
      topMood: getMostFrequentMood(monthEntries),
      avgSleep: monthEntries.filter(e => e.sleepHours).length > 0 
        ? (monthEntries.filter(e => e.sleepHours).reduce((sum, e) => sum + e.sleepHours, 0) / monthEntries.filter(e => e.sleepHours).length).toFixed(1)
        : 0
    };

    setCalendarStats(stats);
  };

  const getMostFrequentMood = (monthEntries) => {
    const moodCount = {};
    monthEntries.forEach(entry => {
      moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
    });
    
    const topMood = Object.entries(moodCount).reduce((a, b) => a[1] > b[1] ? a : b, ['None', 0]);
    return topMood[1] > 0 ? { mood: topMood[0], count: topMood[1], emoji: moodEmojis[topMood[0]] } : null;
  };

  const generateCalendarDays = () => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = [];
  const currentCalendarDate = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    // Format the date without timezone conversion
    const dateStr = formatDateWithoutTimezone(currentCalendarDate);
    
    // Filter entries for this exact date (without timezone issues)
   const dayEntries = entries.filter(entry => {
  const entryDate = new Date(entry.date);
  entryDate.setHours(0, 0, 0, 0); // Normalize time to midnight
  
  const currentDateNormalized = new Date(currentCalendarDate);
  currentDateNormalized.setHours(0, 0, 0, 0);
  
  return entryDate.getTime() === currentDateNormalized.getTime();
});

    // Rest of your existing code...
    const avgScore = dayEntries.length > 0 
      ? dayEntries.reduce((sum, entry) => sum + (entry.score || 0), 0) / dayEntries.length
      : 0;

    const primaryEntry = dayEntries.length > 0 
      ? dayEntries.reduce((prev, current) => {
          if (current.score > prev.score) return current;
          if (current.score === prev.score && new Date(current.timestamp || current.date) > new Date(prev.timestamp || prev.date)) return current;
          return prev;
        })
      : null;

    const dayStats = {
      totalEntries: dayEntries.length,
      avgScore: avgScore,
      totalSleep: dayEntries.filter(e => e.sleepHours).reduce((sum, e) => sum + e.sleepHours, 0),
      avgSleep: dayEntries.filter(e => e.sleepHours).length > 0
        ? dayEntries.filter(e => e.sleepHours).reduce((sum, e) => sum + e.sleepHours, 0) / dayEntries.filter(e => e.sleepHours).length
        : 0,
      allMoods: dayEntries.map(e => ({ mood: e.mood, emoji: moodEmojis[e.mood] || e.emoji, score: e.score })),
      allTags: [...new Set(dayEntries.flatMap(e => e.tags || []))],
      hasJournal: dayEntries.some(e => e.note && e.note.trim().length > 0)
    };

    days.push({
      date: new Date(currentCalendarDate),
      dateStr,
      emoji: primaryEntry ? (moodEmojis[primaryEntry.mood] || primaryEntry.emoji) : null,
      entries: dayEntries,
      primaryEntry,
      hasEntry: dayEntries.length > 0,
      isCurrentMonth: currentCalendarDate.getMonth() === month,
      isToday: isSameDay(currentCalendarDate, new Date()),
      entryCount: dayEntries.length,
      stats: dayStats
    });

    currentCalendarDate.setDate(currentCalendarDate.getDate() + 1);
  }

  return days;
};

// Helper functions to handle date comparison without timezone issues
const formatDateWithoutTimezone = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

  const days = generateCalendarDays();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (day) => {
    setSelectedDay(day);
    setSelectedEntries(day.entries);
    
    if (onDateClick) {
      onDateClick(day.dateStr);
    }
  };

  const handleDateHover = (day) => {
    setHoveredDay(day);
  };

  const handleDateLeave = () => {
    setHoveredDay(null);
  };

  const closeDetailPanel = () => {
    setSelectedDay(null);
    setSelectedEntries([]);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 py-8 px-4">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 rounded-3xl mb-6 shadow-2xl">
            <Calendar className="text-white" size={40} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-[1.3]">
            Mood Heatmap
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2">
            Visualize your emotional patterns
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500">
            Hover over dates for instant insights • Click for detailed view
          </p>
        </motion.div>

        {/* Monthly Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl p-4 shadow-lg border border-white/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Entries</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{calendarStats.totalEntries}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl p-4 shadow-lg border border-white/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Score</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{calendarStats.avgScore}/10</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl p-4 shadow-lg border border-white/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Days</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{calendarStats.activeDays}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl p-4 shadow-lg border border-white/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Mood</span>
            </div>
            <p className="text-lg font-bold text-pink-600">
              {calendarStats.topMood ? `${calendarStats.topMood.emoji}` : '—'}
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl p-4 shadow-lg border border-white/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Sleep</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{calendarStats.avgSleep}h</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl p-4 shadow-lg border border-white/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Best Day</span>
            </div>
            <p className="text-lg font-bold text-orange-600">
              {calendarStats.bestDay ? new Date(calendarStats.bestDay.date).getDate() : '—'}
            </p>
          </div>
        </motion.div>

        {/* Calendar Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mb-6 bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl p-6 shadow-xl border border-white/50 dark:border-gray-700/50"
        >
          <button 
            onClick={() => navigateMonth(-1)} 
            className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={goToToday}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline mt-2 font-medium"
            >
              Jump to Today
            </button>
          </div>
          
          <button 
            onClick={() => navigateMonth(1)} 
            className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </motion.div>

        {/* Heatmap Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50 relative"
        >
          {/* Heatmap Legend */}
          <div className="flex items-center justify-center mb-6 gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
              <div className="w-3 h-3 rounded-sm bg-red-200 dark:bg-red-900/30"></div>
              <div className="w-3 h-3 rounded-sm bg-orange-300 dark:bg-orange-900/40"></div>
              <div className="w-3 h-3 rounded-sm bg-yellow-400 dark:bg-yellow-900/50"></div>
              <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-900/50"></div>
              <div className="w-3 h-3 rounded-sm bg-emerald-500 dark:bg-emerald-900/60"></div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">More</span>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-3 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={index} className="text-center font-bold text-gray-700 dark:text-gray-300 py-3 text-lg">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days - Heatmap Style */}
          <div className="grid grid-cols-7 gap-3">
            {days.map((day, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDateClick(day)}
                onMouseEnter={() => handleDateHover(day)}
                onMouseLeave={handleDateLeave}
                className={`
                  relative h-16 flex flex-col items-center justify-center rounded-2xl cursor-pointer border-2 transition-all duration-300
                  ${day.isToday ? 'border-purple-500 ring-4 ring-purple-200 dark:ring-purple-800' : 'border-transparent'}
                  ${day.isCurrentMonth ? getHeatmapIntensity(day.stats.avgScore, day.entryCount) : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'}
                  ${getHeatmapGlow(day.stats.avgScore)}
                  hover:shadow-xl hover:z-10
                `}
              >
                {/* Date Number */}
                <span className={`text-sm font-bold ${
                  day.isCurrentMonth ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-600'
                } ${day.isToday ? 'text-purple-700 dark:text-purple-300' : ''}`}>
                  {day.date.getDate()}
                </span>
                
                {/* Multiple Entry Indicator */}
                {day.entryCount > 1 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {day.entryCount}
                  </div>
                )}

                {/* Mood Emoji for High Scores */}
                {day.hasEntry && day.stats.avgScore >= 7 && (
                  <span className="text-xs absolute bottom-0.5">{day.emoji}</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Real-time Hover Tooltip */}
          <AnimatePresence>
            {hoveredDay && hoveredDay.hasEntry && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 min-w-80 z-50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{hoveredDay.emoji}</div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                      {formatDate(hoveredDay.dateStr)}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {hoveredDay.entryCount} {hoveredDay.entryCount === 1 ? 'entry' : 'entries'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Score: <strong>{hoveredDay.stats.avgScore.toFixed(1)}/10</strong></span>
                  </div>
                  
                  {hoveredDay.stats.avgSleep > 0 && (
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Sleep: <strong>{hoveredDay.stats.avgSleep.toFixed(1)}h</strong></span>
                    </div>
                  )}

                  {hoveredDay.stats.hasJournal && (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm"><strong>Has Journal</strong></span>
                    </div>
                  )}

                  {hoveredDay.stats.allTags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-green-500" />
                      <span className="text-sm"><strong>{hoveredDay.stats.allTags.length} tags</strong></span>
                    </div>
                  )}
                </div>

                {hoveredDay.stats.allMoods.length > 1 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">All Moods:</p>
                    <div className="flex gap-2 flex-wrap">
                      {hoveredDay.stats.allMoods.map((mood, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                          {mood.emoji} {mood.score}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {hoveredDay.stats.allTags.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags:</p>
                    <div className="flex gap-1 flex-wrap">
                      {hoveredDay.stats.allTags.slice(0, 6).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                      {hoveredDay.stats.allTags.length > 6 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                          +{hoveredDay.stats.allTags.length - 6}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-indigo-900/30 rounded-3xl p-6 border border-purple-200 dark:border-purple-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">Interactive Guide</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300"><strong>Bright colors</strong> = Higher mood scores</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <span className="text-gray-700 dark:text-gray-300"><strong>Numbers</strong> = Multiple entries per day</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-orange-500" />
              <span className="text-gray-700 dark:text-gray-300"><strong>Hover</strong> for instant insights</span>
            </div>
          </div>
        </motion.div>

        {/* Detailed Day Modal */}
        <AnimatePresence>
          {selectedDay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={closeDetailPanel}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        {formatDate(selectedDay.dateStr)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedEntries.length > 0 
                          ? `${selectedEntries.length} mood ${selectedEntries.length === 1 ? 'entry' : 'entries'}`
                          : 'No mood entries for this day'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={closeDetailPanel}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* Day Summary Stats */}
                {selectedDay.hasEntry && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Avg Score</p>
                        <p className="text-xl font-bold text-purple-700 dark:text-purple-300">
                          {selectedDay.stats.avgScore.toFixed(1)}/10
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center">
                        <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Top Mood</p>
                        <p className="text-xl font-bold text-pink-700 dark:text-pink-300">
                          {selectedDay.stats.allMoods[0]?.emoji || '—'}
                        </p>
                      </div>
                    </div>

                    {selectedDay.stats.avgSleep > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                          <Bed className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Sleep</p>
                          <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                            {selectedDay.stats.avgSleep.toFixed(1)}h
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                        <Tag className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Tags</p>
                        <p className="text-xl font-bold text-green-700 dark:text-green-300">
                          {selectedDay.stats.allTags.length || '—'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Entries List */}
                <div className="space-y-6">
                  {selectedEntries.length > 0 ? (
                    selectedEntries.map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white dark:bg-gray-700/50 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-4xl">
                              {moodEmojis[entry.mood] || entry.emoji || '😊'}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 capitalize">
                                {entry.mood}
                              </h4>
                              {entry.timestamp && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatTime(entry.timestamp)}
                                </p>
                              )}
                            </div>
                          </div>
                          {entry.score && (
                            <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold">
                              {entry.score}/10
                            </div>
                          )}
                        </div>

                        {entry.note && (
                          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                              {entry.note}
                            </p>
                          </div>
                        )}

                        {(entry.tags && entry.tags.length > 0) && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {entry.tags.map((tag, i) => (
                              <span 
                                key={i} 
                                className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {entry.sleepHours && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Bed className="w-4 h-4" />
                            <span>Slept <strong>{entry.sleepHours} hours</strong></span>
                          </div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Calendar className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                        No entries for this day
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400">
                        Click the "+" button to add your first mood entry
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MoodCalendar;