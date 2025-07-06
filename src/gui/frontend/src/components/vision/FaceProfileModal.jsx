import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, Camera, Edit, Save, X, MapPin, Heart, MessageCircle } from 'lucide-react';
import Modal from '../shared/Modal';

const FaceProfileModal = ({ isOpen, onClose, person, onSave, onApiCall }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: person?.name || '',
    notes: person?.notes || '',
    relationship: person?.relationship || '',
    favoriteColor: person?.favoriteColor || '#3B82F6',
    interests: person?.interests || [],
    reminders: person?.reminders || ''
  });

  const relationshipOptions = [
    'Family', 'Friend', 'Colleague', 'Neighbor', 'Visitor', 'Service Provider', 'Other'
  ];

  const interestOptions = [
    'Technology', 'Music', 'Sports', 'Art', 'Cooking', 'Travel', 'Reading', 'Gaming',
    'Photography', 'Nature', 'Movies', 'Fitness', 'Science', 'History'
  ];

  const handleSave = () => {
    if (editData.name.trim()) {
      onApiCall(`Would be calling API_ROUTE="/api/faces/${person.id}" for updating face profile`);
      onSave({ ...person, ...editData });
      setIsEditing(false);
    }
  };

  const handleInterestToggle = (interest) => {
    setEditData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  if (!person) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Face Profile" size="lg">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Photo and Basic Info */}
          <div className="md:col-span-1">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={person.photo || `https://picsum.photos/200/200?random=${person.id}`}
                  alt={person.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary-500"
                />
                <button
                  onClick={() => onApiCall(`Would be calling API_ROUTE="/api/faces/${person.id}/photo" for updating profile photo`)}
                  className="absolute bottom-2 right-2 p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-xl font-bold text-center w-full px-3 py-2 border border-border rounded-lg bg-background"
                  placeholder="Enter name"
                />
              ) : (
                <h3 className="text-xl font-bold">{person.name}</h3>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-light">Last Seen</span>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4" />
                  {person.lastSeen}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-light">First Seen</span>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="w-4 h-4" />
                  {person.firstSeen}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-light">Detections</span>
                <span className="text-sm font-medium">{person.detections}</span>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold">Profile Details</h4>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Relationship */}
              <div>
                <label className="block text-sm font-medium mb-2">Relationship</label>
                {isEditing ? (
                  <select
                    value={editData.relationship}
                    onChange={(e) => setEditData(prev => ({ ...prev, relationship: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  >
                    <option value="">Select relationship</option>
                    {relationshipOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-text-light" />
                    <span>{person.relationship || 'Not specified'}</span>
                  </div>
                )}
              </div>

              {/* Favorite Color */}
              <div>
                <label className="block text-sm font-medium mb-2">Favorite Color</label>
                {isEditing ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={editData.favoriteColor}
                      onChange={(e) => setEditData(prev => ({ ...prev, favoriteColor: e.target.value }))}
                      className="w-12 h-8 rounded border border-border cursor-pointer"
                    />
                    <span className="text-sm text-text-light">{editData.favoriteColor}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-border" 
                      style={{ backgroundColor: person.favoriteColor }}
                    />
                    <span>{person.favoriteColor}</span>
                  </div>
                )}
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium mb-2">Interests</label>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map(interest => (
                      <button
                        key={interest}
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                          editData.interests.includes(interest)
                            ? 'bg-primary-500 text-white border-primary-500'
                            : 'bg-background border-border hover:border-primary-500'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {person.interests && person.interests.length > 0 ? (
                      person.interests.map(interest => (
                        <span
                          key={interest}
                          className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))
                    ) : (
                      <span className="text-text-light">No interests specified</span>
                    )}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                {isEditing ? (
                  <textarea
                    value={editData.notes}
                    onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background h-20 resize-none"
                    placeholder="Add any notes about this person..."
                  />
                ) : (
                  <div className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 text-text-light mt-1" />
                    <span className="text-sm">
                      {person.notes || 'No notes available'}
                    </span>
                  </div>
                )}
              </div>

              {/* Reminders */}
              <div>
                <label className="block text-sm font-medium mb-2">Reminders</label>
                {isEditing ? (
                  <textarea
                    value={editData.reminders}
                    onChange={(e) => setEditData(prev => ({ ...prev, reminders: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background h-20 resize-none"
                    placeholder="Things to remember about this person..."
                  />
                ) : (
                  <div className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-text-light mt-1" />
                    <span className="text-sm">
                      {person.reminders || 'No reminders set'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Photos */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Recent Photos</h4>
          <div className="grid grid-cols-6 gap-3">
            {person.recentPhotos?.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={photo.url || `https://picsum.photos/100/100?random=${person.id}-${index}`}
                  alt={`${person.name} ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => onApiCall(`Would be calling API_ROUTE="/api/photos/${photo.id}" for viewing full photo`)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg">
                  <div className="absolute bottom-1 right-1 text-white text-xs opacity-0 group-hover:opacity-100">
                    {photo.date}
                  </div>
                </div>
              </div>
            )) || (
              // Dummy photos if no recent photos available
              Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="relative group">
                  <img
                    src={`https://picsum.photos/100/100?random=${person.id}-${index}`}
                    alt={`${person.name} ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => onApiCall(`Would be calling API_ROUTE="/api/photos/${index}" for viewing full photo`)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg">
                    <div className="absolute bottom-1 right-1 text-white text-xs opacity-0 group-hover:opacity-100">
                      {new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FaceProfileModal;