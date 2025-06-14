import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from '@/components/layout/BottomNav';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Coaches from '@/pages/Coaches';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coaches" element={<Coaches />} />
        </Routes>
        <BottomNav />
      </Router>
    </>
  )
}

export default App
