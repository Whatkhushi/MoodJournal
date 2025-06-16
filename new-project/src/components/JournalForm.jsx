import React, { useState } from 'react';
import MoodSelector from './MoodSelector';

const JournalForm = ({ onSubmit }) => {
  const [mood, setMood] = useState(null);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (mood && text.trim()) {
      onSubmit({ mood, text: text.trim() });
      setMood(null);
      setText('');
    }
  };

  return (
    <div className="space-y-6">
      <MoodSelector selectedMood={mood} onMoodSelect={setMood} />
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          What's on your mind?
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write about your day, your thoughts, or anything you'd like to remember..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          required
        />
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={!mood || !text.trim()}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Save Entry
      </button>
    </div>
  );
};

export default JournalForm;