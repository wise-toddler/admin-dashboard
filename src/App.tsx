import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
// import Leaderboard from './components/Leaderboard';
// Import other components for different routes
import StudentPage from './components/Student/Student';
import QuestionsPage from './components/Questions/Question';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define routes for your components */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
        <Route path="/students" element={<StudentPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        {/* Uncomment and define routes for other components */}
        {/* <Route path="/leaderboard" element={<Leaderboard />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
