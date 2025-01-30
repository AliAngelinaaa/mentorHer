// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is installed

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3000/profiles/id');
        const matchesResponse = await axios.get('/api/matches');

        console.log('User Data:', userResponse.data);
        console.log('Matches Data:', matchesResponse.data);

        setUserData(userResponse.data);
        setMatches(Array.isArray(matchesResponse.data) ? matchesResponse.data : []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-3">
            {userData && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col items-center">
                  <img 
                    src={userData.picture || 'default-avatar.png'} 
                    alt={userData.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                  />
                  <h2 className="mt-4 text-2xl font-bold text-gray-800">{userData.name}</h2>
                  <span className="inline-block px-3 py-1 mt-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                    {userData.role}
                  </span>
                  <p className="mt-4 text-gray-600 text-center">{userData.bio}</p>
                  
                  <div className="w-full mt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase">Location</h3>
                        <p className="text-gray-800">{userData.location || 'Not specified'}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase">Availability</h3>
                        <p className="text-gray-800">{userData.availability || 'Not specified'}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase">Skills</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {userData.skills?.map((skill, index) => (
                            <span key={index} className="px-2 py-1 text-sm bg-gray-200 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Dashboard</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Goals</h3>
                  <div className="space-y-2">
                    {userData?.goals?.map((goal, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData?.interests?.map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Matches Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Top Matches</h3>
              <div className="space-y-4">
                {matches.length > 0 ? (
                  matches.map((match) => (
                    <div key={match.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <img
                          src={match.picture || 'default-avatar.png'}
                          alt={match.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">{match.name}</h4>
                          <p className="text-sm text-gray-600">{match.role}</p>
                        </div>
                      </div>
                      <button className="w-full mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                        Connect
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center">No matches found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
