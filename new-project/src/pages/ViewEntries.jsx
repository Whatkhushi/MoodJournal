import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, Filter, Edit2, Trash2, ChevronDown, Calendar,
  Heart, Smile, Frown, Meh, AlertCircle, Coffee, Zap, Moon
} from 'lucide-react';

const ViewEntries = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2025-06-13',
      mood: '😊',
      moodLabel: 'Happy',
      moodColor: 'bg-yellow-100 border-yellow-300',
      note: 'Had a wonderful morning coffee and finished my project! Feeling accomplished and energized.',
      tags: ['work', 'coffee', 'productive'],
      expanded: false
    },
    {
      id: 2,
      date: '2025-06-12',
      mood: '😌',
      moodLabel: 'Calm',
      moodColor: 'bg-green-100 border-green-300',
      note: 'Peaceful evening walk in the park. The sunset was beautiful and I felt really centered.',
      tags: ['nature', 'walk', 'peaceful'],
      expanded: false
    },
    {
      id: 3,
      date: '2025-06-11',
      mood: '😰',
      moodLabel: 'Anxious',
      moodColor: 'bg-red-100 border-red-300',
      note: 'Big presentation tomorrow. Feeling nervous but trying to stay positive and prepared.',
      tags: ['work', 'presentation', 'nervous'],
      expanded: false
    },
    {
      id: 4,
      date: '2025-06-10',
      mood: '🥰',
      moodLabel: 'Loved',
      moodColor: 'bg-pink-100 border-pink-300',
      note: 'Date night with my partner. We laughed so much and had the best time together.',
      tags: ['love', 'date', 'happiness'],
      expanded: false
    },
    {
      id: 5,
      date: '2025-06-09',
      mood: '😴',
      moodLabel: 'Tired',
      moodColor: 'bg-purple-100 border-purple-300',
      note: 'Long day at work. Need to rest and recharge for tomorrow.',
      tags: ['tired', 'work', 'rest'],
      expanded: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const [isVisible, setIsVisible] = useState(false);

  const moods = [
    { value: 'all', label: 'All Moods', emoji: '🌈' },
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'sad', label: 'Sad', emoji: '😔' },
    { value: 'calm', label: 'Calm', emoji: '😌' },
    { value: 'anxious', label: 'Anxious', emoji: '😰' },
    { value: 'tired', label: 'Tired', emoji: '😴' },
    { value: 'loved', label: 'Loved', emoji: '🥰' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  useEffect(() => {
    setIsVisible(true);
    filterEntries();
  }, [searchTerm, selectedMood, dateRange]);

  const filterEntries = () => {
    let filtered = entries;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.moodLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by mood
    if (selectedMood !== 'all') {
      filtered = filtered.filter(entry => 
        entry.moodLabel.toLowerCase() === selectedMood
      );
    }

    // Filter by date range (simplified logic)
    if (dateRange !== 'all') {
      const today = new Date();
      const entryDate = new Date();
      
      if (dateRange === 'today') {
        filtered = filtered.filter(entry => entry.date === today.toISOString().split('T')[0]);
      } else if (dateRange === 'week') {
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(entry => new Date(entry.date) >= weekAgo);
      } else if (dateRange === 'month') {
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(entry => new Date(entry.date) >= monthAgo);
      }
    }

    setFilteredEntries(filtered);
  };

  const toggleExpanded = (id) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, expanded: !entry.expanded } : entry
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 py-8 px-4">
      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
            <Heart className="text-white" size={32} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-[1.3]">
            Your Journal Entries
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore your emotional journey and reflect on your growth
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search entries, moods, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-400 transition-all duration-300 text-gray-800 dark:text-white"
              />
            </div>

            {/* Mood Filter */}
            <div className="relative">
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="w-full px-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-400 transition-all duration-300 text-gray-800 dark:text-white appearance-none cursor-pointer"
              >
                {moods.map(mood => (
                  <option key={mood.value} value={mood.value}>
                    {mood.emoji} {mood.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>

            {/* Date Range Filter */}
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-400 transition-all duration-300 text-gray-800 dark:text-white appearance-none cursor-pointer"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Showing <span className="font-bold text-purple-600">{filteredEntries.length}</span> {filteredEntries.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>

        {/* Entries List */}
        <div className="space-y-6">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">No entries found</h3>
              <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredEntries.map((entry, index) => (
              <div
                key={entry.id}
                className={`bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-6 shadow-lg hover:shadow-xl border-2 ${entry.moodColor} transition-all duration-300 group hover:scale-[1.02] animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Mood Emoji */}
                    <div className="text-4xl bg-white dark:bg-gray-700 rounded-2xl p-3 shadow-md">
                      {entry.mood}
                    </div>
                    
                    <div className="flex-1">
                      {/* Date and Mood Label */}
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {formatDate(entry.date)}
                        </h3>
                        <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold rounded-full">
                          {entry.moodLabel}
                        </span>
                      </div>

                      {/* Note Preview */}
                      <p className={`text-gray-600 dark:text-gray-300 mb-4 leading-relaxed ${
                        entry.expanded ? '' : 'line-clamp-2'
                      }`}>
                        {entry.note}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {entry.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Expand/Collapse Button */}
                      {entry.note.length > 100 && (
                        <button
                          onClick={() => toggleExpanded(entry.id)}
                          className="text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-300"
                        >
                          {entry.expanded ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-300">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => deleteEntry(entry.id)}
                      className="p-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ViewEntries;