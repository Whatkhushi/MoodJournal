import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MoodCalendar from './pages/MoodCalendar';
import MoodTracking from './pages/MoodTracking';
import DailyReminders from './pages/DailyReminders';
import ViewEntries from './pages/ViewEntries';
import AddNewEntry from './pages/AddNewEntry';

const App = () => {
  const [entries, setEntries] = useState([]); // Sample empty state
  const [currentRoute, setCurrentRoute] = useState('dashboard');

  return (
    <Router>
      <Navbar />
      
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features/calendar" element={<MoodCalendar entries={entries} />} />
          <Route path="/features/mood-tracking" element={<MoodTracking entries={entries} />} />
          <Route path="/features/reminders" element={<DailyReminders entries={entries} />} />
          <Route path="/journal/entries" element={<ViewEntries entries={entries} />} />

          <Route path="/journal/new" element={<AddNewEntry entries={entries} />} />

          <Route
            path="/dashboard"
            element={
              <Dashboard
                entries={entries}
                setCurrentRoute={setCurrentRoute}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;




