import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      
      const now = new Date();
      const stats = [
        { name: 'Last 24 hours', value: countUsersInLastDays(users, 1) },
        { name: 'Last 7 days', value: countUsersInLastDays(users, 7) },
        { name: 'Last 15 days', value: countUsersInLastDays(users, 15) },
        { name: 'Last 30 days', value: countUsersInLastDays(users, 30) },
      ];
      
      setUserStats(stats);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const countUsersInLastDays = (users, days) => {
    const now = new Date();
    const threshold = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return users.filter(user => new Date(user.registeredAt) > threshold).length;
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">User Registration Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" name="Registered Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;