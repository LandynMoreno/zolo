import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Camera, Edit, Save, X, Video, RotateCcw } from 'lucide-react';
import Modal from '../shared/Modal';

const ProfileSettings = ({ onApiCall }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [profileData, setProfileData] = useState({
    name: 'Robot Owner',
    email: 'owner@zolo.robot',
    location: 'Home Office',
    joinDate: '2025-01-01',
    avatar: 'https://picsum.photos/200/200?random=999',
    bio: 'Zolo robot enthusiast and automation lover',
    preferences: {
      notifications: true,
      autoBackup: true,
      voiceWakeup: false,
      emergencyContact: '+1 (555) 123-4567'
    }
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleSave = () => {
    onApiCall('Would be calling API_ROUTE="/api/profile/update" for updating user profile');
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handlePreferenceChange = (key, value) => {
    setEditData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleCameraCapture = () => {
    setIsCapturing(true);
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setTimeout(() => {
            onApiCall('Would be calling API_ROUTE="/api/profile/photo-capture" for capturing profile photo');
            setIsCapturing(false);
            setIsCameraModalOpen(false);
            setCountdown(0);
          }, 200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Profile Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Profile Information</h3>
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

        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={isEditing ? editData.avatar : profileData.avatar}
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-primary-500"
              />
              {isEditing && (
                <button
                  onClick={() => setIsCameraModalOpen(true)}
                  className="absolute bottom-0 right-0 p-1 bg-primary-500 text-white rounded-full hover:bg-primary-600"
                >
                  <Camera className="w-3 h-3" />
                </button>
              )}
            </div>
            {isEditing && (
              <input
                type="url"
                placeholder="Avatar URL"
                value={editData.avatar}
                onChange={(e) => setEditData(prev => ({ ...prev, avatar: e.target.value }))}
                className="mt-2 w-32 px-2 py-1 text-xs border border-border rounded bg-background"
              />
            )}
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-text-light" />
                  <span>{profileData.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-text-light" />
                  <span>{profileData.email}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-text-light" />
                  <span>{profileData.location}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background h-20 resize-none"
                />
              ) : (
                <p className="text-text-light">{profileData.bio}</p>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-text-light">
              <Calendar className="w-4 h-4" />
              <span>Member since {new Date(profileData.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Notifications</div>
              <div className="text-sm text-text-light">Receive system notifications</div>
            </div>
            <button
              onClick={() => {
                const newValue = !editData.preferences.notifications;
                handlePreferenceChange('notifications', newValue);
                onApiCall(`Would be calling API_ROUTE="/api/profile/preferences" for ${newValue ? 'enabling' : 'disabling'} notifications`);
              }}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                editData.preferences.notifications ? 'bg-primary-500' : 'bg-border'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  editData.preferences.notifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto Backup</div>
              <div className="text-sm text-text-light">Automatically backup system data</div>
            </div>
            <button
              onClick={() => {
                const newValue = !editData.preferences.autoBackup;
                handlePreferenceChange('autoBackup', newValue);
                onApiCall(`Would be calling API_ROUTE="/api/profile/preferences" for ${newValue ? 'enabling' : 'disabling'} auto backup`);
              }}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                editData.preferences.autoBackup ? 'bg-primary-500' : 'bg-border'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  editData.preferences.autoBackup ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Voice Wakeup</div>
              <div className="text-sm text-text-light">Respond to voice commands when idle</div>
            </div>
            <button
              onClick={() => {
                const newValue = !editData.preferences.voiceWakeup;
                handlePreferenceChange('voiceWakeup', newValue);
                onApiCall(`Would be calling API_ROUTE="/api/profile/preferences" for ${newValue ? 'enabling' : 'disabling'} voice wakeup`);
              }}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                editData.preferences.voiceWakeup ? 'bg-primary-500' : 'bg-border'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  editData.preferences.voiceWakeup ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Emergency Contact</label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.preferences.emergencyContact}
                onChange={(e) => handlePreferenceChange('emergencyContact', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                placeholder="+1 (555) 123-4567"
              />
            ) : (
              <span className="text-text-light">{profileData.preferences.emergencyContact}</span>
            )}
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      <Modal
        isOpen={isCameraModalOpen}
        onClose={() => !isCapturing && setIsCameraModalOpen(false)}
        title="Take Profile Photo"
        size="lg"
      >
        <div className="p-6">
          <div className="relative bg-black rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '4/3' }}>
            {/* Camera Preview */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-16 h-16 mx-auto mb-4 text-white/50" />
                <p className="text-white/70">Camera Preview</p>
                <p className="text-white/50 text-sm mt-2">Position yourself in frame</p>
              </div>
            </div>
            
            {/* Countdown Overlay */}
            {isCapturing && countdown > 0 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
              >
                <motion.div
                  key={countdown}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="text-white text-8xl font-bold"
                >
                  {countdown}
                </motion.div>
              </motion.div>
            )}

            {/* Camera Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <button
                onClick={() => onApiCall('Would be calling API_ROUTE="/api/camera/flip" for flipping camera')}
                disabled={isCapturing}
                className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 disabled:opacity-50"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleCameraCapture}
                disabled={isCapturing}
                className={`p-4 rounded-full transition-all ${
                  isCapturing 
                    ? 'bg-red-500 scale-110' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <Camera className="w-6 h-6" />
              </button>
              
              <div className="w-12 h-12"></div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsCameraModalOpen(false)}
              disabled={isCapturing}
              className={`flex-1 button bg-surface border border-border py-2 rounded-lg hover:bg-surface/80 ${
                isCapturing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onApiCall('Would be calling API_ROUTE="/api/profile/avatar-url" for setting custom avatar URL');
                setIsCameraModalOpen(false);
              }}
              disabled={isCapturing}
              className={`flex-1 button bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 ${
                isCapturing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Use URL Instead
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default ProfileSettings;