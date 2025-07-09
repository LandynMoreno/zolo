import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Camera, 
  Edit, 
  Save, 
  X, 
  Activity,
  Clock,
  Settings,
  Bell,
  Shield,
  Heart,
  Star,
  Award,
  Zap
} from 'lucide-react';
import ApiNotification from '../components/shared/ApiNotification';

/**
 * Profile page - User profile management with TailAdmin inspiration
 * Clean, modern profile interface with comprehensive user data
 */
const Profile = () => {
  const [notifications, setNotifications] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [profileData, setProfileData] = useState({
    name: 'Robot Owner',
    email: 'owner@zolo.robot',
    location: 'Home Office, San Francisco',
    joinDate: '2025-01-01',
    avatar: 'https://picsum.photos/400/400?random=999',
    bio: 'Passionate about robotics and home automation. Love building smart solutions that make life easier.',
    role: 'Administrator',
    status: 'Online',
    lastActive: 'Just now',
    stats: {
      robotsManaged: 3,
      hoursActive: 248,
      tasksCompleted: 156,
      efficiency: 94
    },
    recentActivity: [
      { id: 1, action: 'Updated LED pattern', time: '2 hours ago', type: 'led' },
      { id: 2, action: 'Calibrated distance sensor', time: '5 hours ago', type: 'sensor' },
      { id: 3, action: 'Created new playlist', time: '1 day ago', type: 'music' },
      { id: 4, action: 'Set alarm for morning routine', time: '2 days ago', type: 'alarm' },
      { id: 5, action: 'Updated face recognition profile', time: '3 days ago', type: 'vision' }
    ],
    achievements: [
      { id: 1, title: 'Early Adopter', desc: 'First user to set up Zolo', icon: '🚀', earned: true },
      { id: 2, title: 'Automation Master', desc: 'Created 50+ automated tasks', icon: '⚡', earned: true },
      { id: 3, title: 'Music Lover', desc: 'Played 100+ hours of music', icon: '🎵', earned: true },
      { id: 4, title: 'Night Owl', desc: 'Active past midnight 10 times', icon: '🦉', earned: false },
      { id: 5, title: 'Tech Guru', desc: 'Used all robot features', icon: '🔧', earned: false },
      { id: 6, title: 'Social Butterfly', desc: 'Added 20+ face profiles', icon: '👥', earned: false }
    ]
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleApiCall = (message) => {
    const notification = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const handleSave = () => {
    handleApiCall('Would be calling API_ROUTE="/api/profile/update" for updating user profile');
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleAvatarUpdate = () => {
    handleApiCall('Would be calling API_ROUTE="/api/profile/avatar" for updating profile avatar');
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'led': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'sensor': return <Activity className="w-4 h-4 text-blue-500" />;
      case 'music': return <Heart className="w-4 h-4 text-pink-500" />;
      case 'alarm': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'vision': return <Camera className="w-4 h-4 text-purple-500" />;
      default: return <Settings className="w-4 h-4 text-gray-500" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'activity', label: 'Activity' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background p-2"
    >
      <div className="max-w-full mx-auto">

        {/* Profile Header */}
        <div className="card mb-6">
          <div className="relative">
            {/* Cover Photo */}
            <div className="h-32 bg-gradient-to-r from-primary-500 to-accent rounded-t-lg"></div>
            
            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={isEditing ? editData.avatar : profileData.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  {isEditing && (
                    <button
                      onClick={handleAvatarUpdate}
                      className="absolute bottom-2 right-2 p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                  <div className={`absolute bottom-4 right-4 w-4 h-4 rounded-full border-2 border-white ${
                    profileData.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>

                {/* User Info */}
                <div className="flex-1 md:mb-4">
                  <div className="flex items-center gap-4 mb-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                        className="text-2xl font-bold bg-transparent border-b-2 border-primary-500 focus:outline-none"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold">{profileData.name}</h2>
                    )}
                    <span className="px-3 py-1 bg-primary-500 text-white text-sm rounded-full">{profileData.role}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-text-light mb-3">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                          className="bg-transparent border-b border-text-light focus:outline-none focus:border-primary-500"
                        />
                      ) : (
                        <span>{profileData.email}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.location}
                          onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                          className="bg-transparent border-b border-text-light focus:outline-none focus:border-primary-500"
                        />
                      ) : (
                        <span>{profileData.location}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full p-2 border border-border rounded bg-background resize-none"
                      rows="2"
                    />
                  ) : (
                    <p className="text-text-light max-w-2xl">{profileData.bio}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-500">{profileData.stats.robotsManaged}</div>
            <div className="text-sm text-text-light">Robots Managed</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-500">{profileData.stats.hoursActive}</div>
            <div className="text-sm text-text-light">Hours Active</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-500">{profileData.stats.tasksCompleted}</div>
            <div className="text-sm text-text-light">Tasks Completed</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-orange-500">{profileData.stats.efficiency}%</div>
            <div className="text-sm text-text-light">Efficiency</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="card mb-6">
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-text-light hover:text-text'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-surface rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-text-light">Status</div>
                          <div className="font-medium text-green-500">{profileData.status}</div>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="p-4 bg-surface rounded-lg">
                      <div className="text-sm text-text-light">Last Active</div>
                      <div className="font-medium">{profileData.lastActive}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {profileData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-surface rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-text-light">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        achievement.earned
                          ? 'border-yellow-500 bg-yellow-500/10'
                          : 'border-border bg-surface opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{achievement.title}</div>
                          <div className="text-sm text-text-light">{achievement.desc}</div>
                        </div>
                        {achievement.earned && (
                          <Award className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-text-light">Receive updates via email</div>
                      </div>
                      <button
                        onClick={() => handleApiCall('Would be calling API_ROUTE="/api/profile/notifications" for toggling email notifications')}
                        className="relative w-12 h-6 rounded-full bg-primary-500"
                      >
                        <div className="absolute top-1 w-4 h-4 bg-white rounded-full translate-x-7 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Auto Backup</div>
                        <div className="text-sm text-text-light">Automatically backup data daily</div>
                      </div>
                      <button
                        onClick={() => handleApiCall('Would be calling API_ROUTE="/api/profile/backup" for toggling auto backup')}
                        className="relative w-12 h-6 rounded-full bg-primary-500"
                      >
                        <div className="absolute top-1 w-4 h-4 bg-white rounded-full translate-x-7 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Security</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleApiCall('Would be calling API_ROUTE="/api/profile/password" for changing password')}
                      className="button w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => handleApiCall('Would be calling API_ROUTE="/api/profile/2fa" for setting up two-factor authentication')}
                      className="button w-full bg-surface border border-border py-2 rounded-lg hover:bg-surface/80"
                    >
                      Enable Two-Factor Auth
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* API Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {notifications.map(notification => (
          <ApiNotification
            key={notification.id}
            message={notification.message}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Profile;