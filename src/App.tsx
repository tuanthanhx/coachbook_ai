import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Coaches from '@/pages/Coaches';
import CoachProfile from '@/pages/CoachProfile';
import Chats from '@/pages/Chats';
import ChatInterface from '@/pages/ChatInterface';
import TodayInsights from '@/pages/TodayInsights';
import Tracker from '@/pages/Tracker';
import TrackerTasks from '@/pages/TrackerTasks';
import Settings from '@/pages/Settings';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/coaches/:id" element={<CoachProfile />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:id" element={<ChatInterface />} />
          <Route path="/insights" element={<TodayInsights />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/tracker/:id/tasks" element={<TrackerTasks />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
