import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Heart,
  Plus,
  Save,
  Sparkles,
  Tag,
  Smile,
  Check,
  ArrowLeft,
  Coffee,
  Sun,
  Moon,
} from "lucide-react";

const AddNewEntry = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [note, setNote] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [customTag, setCustomTag] = useState("");

  const moods = [
    {
      emoji: "😊",
      label: "Happy",
      color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300",
    },
    {
      emoji: "😔",
      label: "Sad",
      color: "bg-blue-100 hover:bg-blue-200 border-blue-300",
    },
    {
      emoji: "😌",
      label: "Calm",
      color: "bg-green-100 hover:bg-green-200 border-green-300",
    },
    {
      emoji: "😰",
      label: "Anxious",
      color: "bg-red-100 hover:bg-red-200 border-red-300",
    },
    {
      emoji: "😴",
      label: "Tired",
      color: "bg-purple-100 hover:bg-purple-200 border-purple-300",
    },
    {
      emoji: "🤔",
      label: "Thoughtful",
      color: "bg-indigo-100 hover:bg-indigo-200 border-indigo-300",
    },
    {
      emoji: "😡",
      label: "Angry",
      color: "bg-orange-100 hover:bg-orange-200 border-orange-300",
    },
    {
      emoji: "🥰",
      label: "Loved",
      color: "bg-pink-100 hover:bg-pink-200 border-pink-300",
    },
    {
      emoji: "🤗",
      label: "Grateful",
      color: "bg-emerald-100 hover:bg-emerald-200 border-emerald-300",
    },
    {
      emoji: "😎",
      label: "Confident",
      color: "bg-cyan-100 hover:bg-cyan-200 border-cyan-300",
    },
    {
      emoji: "🤒",
      label: "Unwell",
      color: "bg-slate-100 hover:bg-slate-200 border-slate-300",
    },
    {
      emoji: "🥳",
      label: "Excited",
      color: "bg-rose-100 hover:bg-rose-200 border-rose-300",
    },
  ];

  const predefinedTags = [
    "work",
    "family",
    "friends",
    "health",
    "exercise",
    "food",
    "travel",
    "learning",
    "creative",
    "nature",
    "music",
    "reading",
    "meditation",
    "celebration",
    "challenge",
    "growth",
    "love",
    "gratitude",
    "achievement",
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    if (
      customTag.trim() &&
      !selectedTags.includes(customTag.trim().toLowerCase())
    ) {
      setSelectedTags([...selectedTags, customTag.trim().toLowerCase()]);
      setCustomTag("");
    }
  };
  const handleSubmit = async (e) => {
    // made this async
    e.preventDefault();
    if (selectedMood && note.trim()) {
      try {
        // send POST request to backend
        await axios.post("http://localhost:5000/add-entry", {
          date: selectedDate,
          mood: selectedMood.label,
          tags: selectedTags,
          note: note,
        });

        setShowToast(true);

        // Reset form
        setTimeout(() => {
          setSelectedMood(null);
          setSelectedTags([]);
          setNote("");
          setSelectedDate(new Date().toISOString().split("T")[0]);
          setShowToast(false);
        }, 2000);
      } catch (error) {
        console.error('Error adding entry:', error);
      }
    } else {
      alert('Please select a mood and write a note.');
    }
  };
  
  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { icon: <Sun size={20} />, text: "Good Morning" };
    if (hour < 18) return { icon: <Sun size={20} />, text: "Good Afternoon" };
    return { icon: <Moon size={20} />, text: "Good Evening" };
  };

  const timeOfDay = getTimeOfDay();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 py-8 px-4">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-8 right-8 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in">
          <Check size={24} />
          <span className="font-semibold">Entry saved successfully! ✨</span>
        </div>
      )}

      <div
        className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
            <Plus className="text-white" size={32} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-[1.4]">
            New Journal Entry
          </h1>
          <div className="flex items-center justify-center gap-2 text-xl text-gray-600 dark:text-gray-400">
            {timeOfDay.icon}
            <span>{timeOfDay.text}! How are you feeling?</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Date Selection */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-purple-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Select Date
              </h2>
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
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  You're logging for:
                </p>
                <p className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                  {formatDateForDisplay(selectedDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Mood Selection */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-purple-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                How are you feeling?
              </h2>
              {selectedMood && (
                <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full">
                  <span className="text-lg">{selectedMood.emoji}</span>
                  <span className="font-semibold">{selectedMood.label}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {moods.map((mood, index) => (
                <div
                  key={index}
                  onClick={() => handleMoodSelect(mood)}
                  className={`${mood.color} ${
                    selectedMood?.label === mood.label
                      ? "ring-4 ring-purple-300 scale-105 shadow-lg"
                      : "hover:scale-110"
                  } rounded-2xl p-6 cursor-pointer transition-all duration-300 text-center border-2 group`}
                >
                  <div className="text-3xl mb-2 group-hover:animate-bounce">
                    {mood.emoji}
                  </div>
                  <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                    {mood.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags Selection */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Tag className="text-purple-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Add Tags
              </h2>
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
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addCustomTag())
                }
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
            <div className="flex flex-wrap gap-3">
              {predefinedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTags.includes(tag)
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-105"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* Selected Tags Display */}
            {selectedTags.length > 0 && (
              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-2xl">
                <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  Selected Tags:
                </p>
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
          </div>

          {/* Note Entry */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="text-purple-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Add Your Notes
              </h2>
            </div>

            <textarea
              rows={6}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write about your day, your feelings, or anything you'd like to remember..."
              className="w-full px-6 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-400 transition-all duration-300 text-gray-800 dark:text-white text-lg"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-bold rounded-full hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-3"
            >
              <Save size={24} />
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEntry;
