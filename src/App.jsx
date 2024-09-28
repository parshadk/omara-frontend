import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Analytics from './components/Analytics';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    setUsers(data);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="hidden md:flex items-center space-x-1">
                  <Link to="/" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">User List</Link>
                  <Link to="/add" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Add User</Link>
                  <Link to="/analytics" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Analytics</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto mt-8 px-4">
          <Routes>
            <Route path="/" element={<UserList users={users} onUserUpdate={fetchUsers} />} />
            <Route path="/add" element={<UserForm onUserAdd={fetchUsers} />} />
            <Route path="/edit/:id" element={<UserForm users={users} onUserUpdate={fetchUsers} />} />
            <Route path="/analytics" element={<Analytics users={users} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;