// src/components/AdminLogin.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const hardcodedPassword = '123'; // Replace with your password

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === hardcodedPassword) {
      setError('');
      localStorage.setItem('isAdmin', 'true'); // Store login status in local storage
      navigate('/admin'); // Redirect to the admin dashboard
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div style={{ margin: '0 auto', width: '300px', textAlign: 'center' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
