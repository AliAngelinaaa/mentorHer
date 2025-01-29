// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is installed

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch user data and matches when component mounts
    const fetchDashboardData = async () => {
      try {
        const userResponse = await axios.get('/api/user/profile');
        const matchesResponse = await axios.get('/api/matches');
        
        setUserData(userResponse.data);
        setMatches(matchesResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Left sidebar with profile card */}
      <div className="profile-sidebar">
        {userData && (
          <div className="profile-card">
            <img src={userData.avatar} alt="Profile" className="profile-avatar" />
            <h3>{userData.name}</h3>
            <p>{userData.role}</p>
            <p>{userData.bio}</p>
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className="main-content">
        <h2>Dashboard</h2>
        <p>View and manage your mentor-mentee connections.</p>
      </div>

      {/* Right sidebar with matches */}
      <div className="matches-sidebar">
        <h3>Top Matches</h3>
        {matches.map((match) => (
          <div key={match.id} className="match-card">
            <img src={match.avatar} alt={match.name} className="match-avatar" />
            <h4>{match.name}</h4>
            <p>{match.role}</p>
            <button className="connect-button">Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
