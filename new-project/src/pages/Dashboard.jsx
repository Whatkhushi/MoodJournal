  import React, { useState, useEffect } from 'react';
  import { 
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, 
    CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
  } from 'recharts';
  import { 
    Calendar, Trophy, Star, Target, Award, Flame, Heart, Zap, 
    TrendingUp, Moon, Clock, Filter, ChevronDown
  } from 'lucide-react';

  const MoodDashboard = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [dateRange, setDateRange] = useState('30');
    const [isVisible, setIsVisible] = useState(false);
    
    // Sample data - in real app this would come from user's actual entries
    const [moodEntries] = useState([
      { id: 1, date: '2025-06-01', mood: 'Happy', score: 8, sleep: 7, tags: ['work', 'productive'] },
      { id: 2, date: '2025-06-02', mood: 'Calm', score: 7, sleep: 8, tags: ['relaxation', 'family'] },
      { id: 3, date: '2025-06-03', mood: 'Anxious', score: 4, sleep: 5, tags: ['work', 'deadline'] },
      { id: 4, date: '2025-06-04', mood: 'Happy', score: 9, sleep: 8, tags: ['friends', 'social'] },
      { id: 5, date: '2025-06-05', mood: 'Tired', score: 5, sleep: 6, tags: ['work', 'tired'] },
      { id: 6, date: '2025-06-06', mood: 'Excited', score: 9, sleep: 7, tags: ['achievement', 'work'] },
      { id: 7, date: '2025-06-07', mood: 'Calm', score: 8, sleep: 9, tags: ['weekend', 'relaxation'] },
      { id: 8, date: '2025-06-08', mood: 'Happy', score: 8, sleep: 8, tags: ['family', 'social'] },
      { id: 9, date: '2025-06-09', mood: 'Sad', score: 3, sleep: 6, tags: ['personal', 'reflection'] },
      { id: 10, date: '2025-06-10', mood: 'Happy', score: 7, sleep: 7, tags: ['work', 'productive'] },
      { id: 11, date: '2025-06-11', mood: 'Anxious', score: 4, sleep: 5, tags: ['work', 'stress'] },
      { id: 12, date: '2025-06-12', mood: 'Calm', score: 8, sleep: 8, tags: ['meditation', 'self-care'] },
      { id: 13, date: '2025-06-13', mood: 'Happy', score: 9, sleep: 8, tags: ['friends', 'celebration'] },
      { id: 14, date: '2025-06-14', mood: 'Excited', score: 9, sleep: 7, tags: ['achievement', 'personal'] },
      { id: 15, date: '2025-06-15', mood: 'Happy', score: 8, sleep: 8, tags: ['weekend', 'family'] },
    ]);

    const dateRanges = [
      { value: '7', label: '7 Days' },
      { value: '30', label: '30 Days' },
      { value: '90', label: '90 Days' },
      { value: 'all', label: 'All Time' }
    ];

    useEffect(() => {
      setIsVisible(true);
    }, []);

    // Filter data based on date range
    const getFilteredData = () => {
      if (dateRange === 'all') return moodEntries;
      
      const daysBack = parseInt(dateRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysBack);
      
      return moodEntries.filter(entry => new Date(entry.date) >= cutoffDate);
    };

    const filteredData = getFilteredData();

    // Dashboard calculations
    const totalMoods = filteredData.length;
    const averageMood = totalMoods > 0 ? (filteredData.reduce((sum, entry) => sum + entry.score, 0) / totalMoods).toFixed(1) : 0;
    const averageSleep = totalMoods > 0 ? (filteredData.reduce((sum, entry) => sum + entry.sleep, 0) / totalMoods).toFixed(1) : 0;
    const currentStreak = 15; // This would be calculated based on consecutive days
    const uniqueTags = [...new Set(filteredData.flatMap(entry => entry.tags))].length;

    // Mood trend data
    const getTrendData = () => {
      return filteredData.map(entry => ({
        date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: entry.score,
        sleep: entry.sleep,
        fullDate: entry.date
      }));
    };

    // Mood distribution data
    const getMoodDistribution = () => {
      const moodCounts = filteredData.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
      }, {});
      
      const colors = {
        'Happy': '#10B981',
        'Calm': '#3B82F6',
        'Anxious': '#EF4444',
        'Sad': '#6B7280',
        'Excited': '#F59E0B',
        'Tired': '#8B5CF6'
      };
      
      return Object.entries(moodCounts).map(([mood, count]) => ({
        name: mood,
        value: count,
        color: colors[mood] || '#6B7280'
      }));
    };

    // Tags frequency data
    const getTagsFrequency = () => {
      const tagCounts = filteredData.reduce((acc, entry) => {
        entry.tags.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      }, {});
      
      return Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    };

    // Mood by weekday
    const getMoodByWeekday = () => {
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const weekdayData = weekdays.map(day => ({ day, scores: [], average: 0 }));
      
      filteredData.forEach(entry => {
        const dayIndex = new Date(entry.date).getDay();
        weekdayData[dayIndex].scores.push(entry.score);
      });
      
      return weekdayData.map(data => ({
        day: data.day.slice(0, 3),
        average: data.scores.length > 0 ? 
          (data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length).toFixed(1) : 0
      }));
    };

    // Calendar heatmap data (simplified)
    const getCalendarData = () => {
      const today = new Date(2025, 5, 15); // June 15, 2025
      const days = [];
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const entry = filteredData.find(e => e.date === dateStr);
        
        days.push({
          date: dateStr,
          day: date.getDate(),
          score: entry ? entry.score : null,
          mood: entry ? entry.mood : null
        });
      }
      
      return days;
    };

    const achievements = [
      { 
        id: 1, 
        name: 'Mood Tracker', 
        icon: Trophy, 
        earned: totalMoods >= 10,
        description: `${totalMoods}/10 moods logged`,
        progress: Math.min((totalMoods / 10) * 100, 100)
      },
      { 
        id: 2, 
        name: 'Streak Master', 
        icon: Flame, 
        earned: currentStreak >= 7,
        description: `${currentStreak} day streak`,
        progress: Math.min((currentStreak / 7) * 100, 100)
      },
      { 
        id: 3, 
        name: 'Tag Explorer', 
        icon: Star, 
        earned: uniqueTags >= 8,
        description: `${uniqueTags}/8 unique tags`,
        progress: Math.min((uniqueTags / 8) * 100, 100)
      },
      { 
        id: 4, 
        name: 'Sleep Champion', 
        icon: Moon, 
        earned: averageSleep >= 8,
        description: `${averageSleep}h avg sleep`,
        progress: Math.min((averageSleep / 8) * 100, 100)
      }
    ];

    const getScoreColor = (score) => {
      if (score >= 8) return 'bg-green-500';
      if (score >= 6) return 'bg-yellow-500';
      if (score >= 4) return 'bg-orange-500';
      return 'bg-red-500';
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 py-8 px-4">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
              <TrendingUp className="text-white" size={32} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-[1.3]">
              Mood Analytics Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover patterns in your emotional journey and track your mental wellness
            </p>
          </div>

          {/* Date Range Filter */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="text-purple-600" size={20} />
                <span className="text-lg font-semibold text-gray-800 dark:text-white">Time Range:</span>
              </div>
              <div className="relative">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-6 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-400 transition-all duration-300 text-gray-800 dark:text-white appearance-none cursor-pointer pr-12"
                >
                  {dateRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="text-orange-500" size={24} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white">{currentStreak}</div>
              <div className="text-sm text-gray-500">days</div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="text-red-500" size={24} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Moods</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white">{totalMoods}</div>
              <div className="text-sm text-gray-500">entries</div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="text-yellow-500" size={24} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Mood</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white">{averageMood}</div>
              <div className="text-sm text-gray-500">out of 10</div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <Moon className="text-purple-500" size={24} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Sleep</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white">{averageSleep}</div>
              <div className="text-sm text-gray-500">hours</div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <Target className="text-blue-500" size={24} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Unique Tags</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white">{uniqueTags}</div>
              <div className="text-sm text-gray-500">categories</div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Mood Trends */}
            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">📈 Mood Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getTrendData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis domain={[0, 10]} stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#8b5cf6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Sleep & Mood Correlation */}
            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">💤 Sleep & Mood Correlation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getTrendData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    name="Mood Score"
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sleep" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Sleep Hours"
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Mood Distribution */}
            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🍰 Mood Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={getMoodDistribution()}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {getMoodDistribution().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Tags Frequency */}
            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🔖 Popular Tags</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={getTagsFrequency()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="tag" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Mood by Weekday */}
            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">📊 Mood by Weekday</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={getMoodByWeekday()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis domain={[0, 10]} stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Bar dataKey="average" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Calendar Heatmap */}
          <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">📅 Mood Calendar Heatmap</h3>
            <div className="grid grid-cols-10 gap-2">
              {getCalendarData().map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-300 hover:scale-110 ${
                    day.score ? getScoreColor(day.score) + ' text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                  title={day.score ? `${day.mood} - Score: ${day.score}` : 'No entry'}
                >
                  {day.day}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center mt-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <div className="w-3 h-3 bg-green-500 rounded"></div>
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🏆 Achievements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300' 
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <achievement.icon 
                      size={32} 
                      className={achievement.earned ? 'text-yellow-500' : 'text-gray-400'} 
                    />
                    <div className="flex-1">
                      <div className="font-bold text-gray-800 dark:text-white">{achievement.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        achievement.earned ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Mood Logs */}
          <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🕒 Recent Mood Logs</h3>
            <div className="space-y-4">
              {filteredData.slice(0, 5).map((entry, index) => (
                <div
                  key={entry.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{entry.mood === 'Happy' ? '😊' : entry.mood === 'Calm' ? '😌' : entry.mood === 'Anxious' ? '😰' : entry.mood === 'Sad' ? '😔' : entry.mood === 'Excited' ? '🎉' : '😴'}</div>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-white">{entry.mood}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(entry.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">{entry.score}/10</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{entry.sleep}h sleep</div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default MoodDashboard;