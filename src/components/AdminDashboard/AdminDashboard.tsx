// src/components/AdminDashboard.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin-login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Your admin dashboard content goes here */}
    </div>
  );
};

export default AdminDashboard;
