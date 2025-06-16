import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Tag, Heart, Sparkles, Sun, Moon, Coffee, Check, Calendar } from 'lucide-react';

const MoodTracking = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [note, setNote] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [customTag, setCustomTag] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300" },
    { emoji: "😔", label: "Sad", color: "bg-blue-100 hover:bg-blue-200 border-blue-300" },
    { emoji: "😌", label: "Calm", color: "bg-green-100 hover:bg-green-200 border-green-300" },
    { emoji: "😰", label: "Anxious", color: "bg-red-100 hover:bg-red-200 border-red-300" },
    { emoji: "😴", label: "Tired", color: "bg-purple-100 hover:bg-purple-200 border-purple-300" },
    { emoji: "🤔", label: "Thoughtful", color: "bg-indigo-100 hover:bg-indigo-200 border-indigo-300" },
    { emoji: "😡", label: "Angry", color: "bg-orange-100 hover:bg-orange-200 border-orange-300" },
    { emoji: "🥰", label: "Loved", color: "bg-pink-100 hover:bg-pink-200 border-pink-300" },
    { emoji: "🤗", label: "Grateful", color: "bg-emerald-100 hover:bg-emerald-200 border-emerald-300" },
    { emoji: "😎", label: "Confident", color: "bg-cyan-100 hover:bg-cyan-200 border-cyan-300" },
    { emoji: "🤒", label: "Unwell", color: "bg-slate-100 hover:bg-slate-200 border-slate-300" },
    { emoji: "🥳", label: "Excited", color: "bg-rose-100 hover:bg-rose-200 border-rose-300" }
  ];

  const predefinedTags = [
    'work', 'family', 'friends', 'health', 'exercise', 'food', 'travel',
    'learning', 'creative', 'nature', 'music', 'reading', 'meditation',
    'celebration', 'challenge', 'growth', 'love', 'gratitude', 'achievement'
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim().toLowerCase())) {
      setSelectedTags([...selectedTags, customTag.trim().toLowerCase()]);
      setCustomTag('');
    }
  };

  const handleSubmit = () => {
    if (!selectedMood) {
      alert('Please select a mood first!');
      return;
    }

    const entry = {
      mood: selectedMood.label,
      emoji: selectedMood.emoji,
      tags: selectedTags,
      note: note,
      date: selectedDate
    };

    console.log('Mood entry:', entry);
    
    // Show success toast
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      // Reset form
      setSelectedMood(null);
      setSelectedTags([]);
      setNote('');
      setCustomTag('');
    }, 2000);
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { icon: <Sun size={20} />, text: 'Good Morning' };
    if (hour < 18) return { icon: <Coffee size={20} />, text: 'Good Afternoon' };
    return { icon: <Moon size={20} />, text: 'Good Evening' };
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const timeOfDay = getTimeOfDay();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 py-8 px-4">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-8 right-8 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <Check size={24} />
            <span className="font-semibold">Mood saved successfully! ✨</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
            <Heart className="text-white" size={32} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-[1.4]">
            How are you feeling today?
          </h1>
          <div className="flex items-center justify-center gap-2 text-xl text-gray-600 dark:text-gray-400">
            {timeOfDay.icon}
            <span>{timeOfDay.text}! Take a moment to reflect</span>
          </div>
        </motion.div>

        {/* Date Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-purple-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Select Date</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-6 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-400 transition-all duration-300 text-gray-800 dark:text-white text-lg"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">Tracking mood for:</p>
              <p className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                {formatDateForDisplay(selectedDate)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mood Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-purple-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Select Your Mood</h2>
            {selectedMood && (
              <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full">
                <span className="text-lg">{selectedMood.emoji}</span>
                <span className="font-semibold">{selectedMood.label}</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {moods.map((mood, index) => (
              <motion.button
                key={mood.label}
                onClick={() => setSelectedMood(mood)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className={`${mood.color} ${
                  selectedMood?.label === mood.label 
                    ? 'ring-4 ring-purple-300 scale-105 shadow-lg' 
                    : 'hover:scale-110'
                } rounded-2xl p-6 cursor-pointer transition-all duration-300 text-center border-2 group`}
              >
                <div className="text-3xl mb-2 group-hover:animate-bounce">{mood.emoji}</div>
                <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm">{mood.label}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tags Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Tag className="text-purple-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">What's influencing your mood?</h2>
            <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              {selectedTags.length} selected
            </div>
          </div>
          
          {/* Custom Tag Input */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Add custom tag..."
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300 text-gray-800 dark:text-white"
            />
            <button
              type="button"
              onClick={addCustomTag}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:scale-105 transition-transform duration-300 font-semibold"
            >
              Add
            </button>
          </div>

          {/* Predefined Tags */}
          <div className="flex flex-wrap gap-3 mb-6">
            {predefinedTags.map((tag) => (
              <motion.button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                #{tag}
              </motion.button>
            ))}
          </div>

          {/* Selected Tags Display */}
          {selectedTags.length > 0 && (
            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-2xl">
              <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">Selected Tags:</p>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm rounded-full flex items-center gap-2"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className="text-white hover:text-gray-200 text-xs"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Note Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-purple-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add Your Personal Note</h2>
          </div>

          <textarea
            placeholder="How was your day? What made you feel this way? Share your thoughts..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={6}
            className="w-full px-6 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-400 transition-all duration-300 text-gray-800 dark:text-white text-lg resize-none"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!selectedMood}
            className={`px-8 py-4 rounded-2xl font-bold text-white text-xl shadow-2xl transition-all duration-300 flex items-center mx-auto space-x-3 ${
              selectedMood
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-3xl'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <Save size={24} />
            <span>Save My Mood {selectedMood?.emoji}</span>
          </motion.button>
        </motion.div>

        {/* Selected Mood Preview */}
        <AnimatePresence>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-center"
            >
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-purple-200 max-w-md mx-auto shadow-xl">
                <p className="text-gray-600 mb-2 text-lg">You're feeling:</p>
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <span className="text-5xl">{selectedMood.emoji}</span>
                  <span className="text-2xl font-bold text-gray-800">
                    {selectedMood.label}
                  </span>
                </div>
                {selectedTags.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Related to:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {selectedTags.map(tag => (
                        <span key={tag} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MoodTracking;