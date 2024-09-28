import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Analytics({ users }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    const getRegistrationCounts = () => {
      return [
        { period: 'Last 24 hours', count: users.filter(u => new Date(u.registrationDate) >= new Date(now - oneDay)).length },
        { period: 'Last 7 days', count: users.filter(u => new Date(u.registrationDate) >= new Date(now - 7 * oneDay)).length },
        { period: 'Last 15 days', count: users.filter(u => new Date(u.registrationDate) >= new Date(now - 15 * oneDay)).length },
        { period: 'Last 30 days', count: users.filter(u => new Date(u.registrationDate) >= new Date(now - 30 * oneDay)).length },
      ];
    };

    setData(getRegistrationCounts());
  }, [users]);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6">User Registration Analytics</h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;