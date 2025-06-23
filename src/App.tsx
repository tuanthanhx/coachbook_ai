import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
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
import Profile from '@/pages/settings/Profile';
import Notification from '@/pages/settings/Notification';
import Password from '@/pages/settings/Password';
import Subscription from '@/pages/settings/Subscription';
import PrivateRoute from '@/components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coaches" element={<PrivateRoute><Coaches /></PrivateRoute>} />
          <Route path="/coaches/:id" element={<PrivateRoute><CoachProfile /></PrivateRoute>} />
          <Route path="/chats" element={<PrivateRoute><Chats /></PrivateRoute>} />
          <Route path="/chats/:id" element={<PrivateRoute><ChatInterface /></PrivateRoute>} />
          <Route path="/insights" element={<PrivateRoute><TodayInsights /></PrivateRoute>} />
          <Route path="/tracker" element={<PrivateRoute><Tracker /></PrivateRoute>} />
          <Route path="/tracker/:id/tasks" element={<PrivateRoute><TrackerTasks /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/settings/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/settings/notification" element={<PrivateRoute><Notification /></PrivateRoute>} />
          <Route path="/settings/password" element={<PrivateRoute><Password /></PrivateRoute>} />
          <Route path="/settings/subscription" element={<PrivateRoute><Subscription /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
