import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Play, Pause, Grid, User, Clock, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import FaceProfileModal from '../components/vision/FaceProfileModal';
import Modal from '../components/shared/Modal';
import ApiNotification from '../components/shared/ApiNotification';

/**
 * Vision & Media page - Camera, photo gallery, and face recognition
 * Comprehensive vision system with face recognition and media management
 */
const VisionMedia = () => {
  const [notifications, setNotifications] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

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

  const mockPhotos = [
    { id: 1, url: 'https://picsum.photos/300/300?random=1', date: '2025-07-06', time: '14:30' },
    { id: 2, url: 'https://picsum.photos/300/300?random=2', date: '2025-07-06', time: '12:15' },
    { id: 3, url: 'https://picsum.photos/300/300?random=3', date: '2025-07-05', time: '18:45' },
    { id: 4, url: 'https://picsum.photos/300/300?random=4', date: '2025-07-05', time: '09:20' },
    { id: 5, url: 'https://picsum.photos/300/300?random=5', date: '2025-07-04', time: '16:30' },
    { id: 6, url: 'https://picsum.photos/300/300?random=6', date: '2025-07-04', time: '11:00' },
    { id: 7, url: 'https://picsum.photos/300/300?random=7', date: '2025-07-03', time: '20:15' },
    { id: 8, url: 'https://picsum.photos/300/300?random=8', date: '2025-07-03', time: '08:45' },
    { id: 9, url: 'https://picsum.photos/300/300?random=9', date: '2025-07-02', time: '15:20' },
    { id: 10, url: 'https://picsum.photos/300/300?random=10', date: '2025-07-02', time: '10:30' },
    { id: 11, url: 'https://picsum.photos/300/300?random=11', date: '2025-07-01', time: '19:00' },
    { id: 12, url: 'https://picsum.photos/300/300?random=12', date: '2025-07-01', time: '13:45' }
  ];

  const knownFaces = [
    {
      id: 1,
      name: 'John Doe',
      photo: 'https://picsum.photos/200/200?random=101',
      lastSeen: '2 hours ago',
      firstSeen: '2025-06-15',
      detections: 47,
      relationship: 'Family',
      favoriteColor: '#3B82F6',
      interests: ['Technology', 'Photography', 'Music'],
      notes: 'Always wears a blue jacket. Usually visits in the morning.',
      reminders: 'Ask about his photography project',
      recentPhotos: [
        { id: 1, url: 'https://picsum.photos/100/100?random=101-1', date: '2025-07-06' },
        { id: 2, url: 'https://picsum.photos/100/100?random=101-2', date: '2025-07-05' },
        { id: 3, url: 'https://picsum.photos/100/100?random=101-3', date: '2025-07-04' },
        { id: 4, url: 'https://picsum.photos/100/100?random=101-4', date: '2025-07-03' },
        { id: 5, url: 'https://picsum.photos/100/100?random=101-5', date: '2025-07-02' },
        { id: 6, url: 'https://picsum.photos/100/100?random=101-6', date: '2025-07-01' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      photo: 'https://picsum.photos/200/200?random=102',
      lastSeen: '1 day ago',
      firstSeen: '2025-06-20',
      detections: 23,
      relationship: 'Friend',
      favoriteColor: '#10B981',
      interests: ['Art', 'Cooking', 'Reading'],
      notes: 'Loves to discuss books. Always brings homemade cookies.',
      reminders: 'Recommend the new mystery novel',
      recentPhotos: [
        { id: 1, url: 'https://picsum.photos/100/100?random=102-1', date: '2025-07-05' },
        { id: 2, url: 'https://picsum.photos/100/100?random=102-2', date: '2025-07-04' },
        { id: 3, url: 'https://picsum.photos/100/100?random=102-3', date: '2025-07-03' },
        { id: 4, url: 'https://picsum.photos/100/100?random=102-4', date: '2025-07-02' },
        { id: 5, url: 'https://picsum.photos/100/100?random=102-5', date: '2025-07-01' },
        { id: 6, url: 'https://picsum.photos/100/100?random=102-6', date: '2025-06-30' }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      photo: 'https://picsum.photos/200/200?random=103',
      lastSeen: '3 days ago',
      firstSeen: '2025-06-10',
      detections: 15,
      relationship: 'Colleague',
      favoriteColor: '#F59E0B',
      interests: ['Sports', 'Fitness', 'Movies'],
      notes: 'Works in tech. Always talks about the latest gadgets.',
      reminders: 'Ask about the new project launch',
      recentPhotos: [
        { id: 1, url: 'https://picsum.photos/100/100?random=103-1', date: '2025-07-03' },
        { id: 2, url: 'https://picsum.photos/100/100?random=103-2', date: '2025-07-02' },
        { id: 3, url: 'https://picsum.photos/100/100?random=103-3', date: '2025-07-01' },
        { id: 4, url: 'https://picsum.photos/100/100?random=103-4', date: '2025-06-30' },
        { id: 5, url: 'https://picsum.photos/100/100?random=103-5', date: '2025-06-29' },
        { id: 6, url: 'https://picsum.photos/100/100?random=103-6', date: '2025-06-28' }
      ]
    }
  ];

  const recentDetections = [
    { id: 1, type: 'unknown', message: 'Unknown person detected', time: '5 minutes ago' },
    { id: 2, type: 'known', person: 'John Doe', message: 'John Doe recognized', time: '1 hour ago' },
    { id: 3, type: 'known', person: 'Jane Smith', message: 'Jane Smith recognized', time: '2 hours ago' },
    { id: 4, type: 'unknown', message: 'Unknown person detected', time: '3 hours ago' },
    { id: 5, type: 'known', person: 'Mike Johnson', message: 'Mike Johnson recognized', time: '5 hours ago' }
  ];

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
    setIsProfileModalOpen(true);
  };

  const handlePersonSave = (updatedPerson) => {
    handleApiCall(`Would be calling API_ROUTE="/api/faces/${updatedPerson.id}" for updating face profile`);
  };

  const handleCapturePhoto = () => {
    handleApiCall('Would be calling API_ROUTE="/api/camera/capture" for capturing photo');
  };

  const handleRecordVideo = () => {
    if (isRecording) {
      handleApiCall('Would be calling API_ROUTE="/api/camera/stop-recording" for stopping video recording');
    } else {
      handleApiCall('Would be calling API_ROUTE="/api/camera/start-recording" for starting video recording');
    }
    setIsRecording(!isRecording);
  };

  const handleViewGallery = () => {
    handleApiCall('Would be calling API_ROUTE="/api/gallery" for fetching gallery photos');
    setIsGalleryModalOpen(true);
  };

  const handleDetectionClick = (detection) => {
    if (detection.type === 'known') {
      const person = knownFaces.find(p => p.name === detection.person);
      if (person) {
        handlePersonClick(person);
      }
    }
  };

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % mockPhotos.length);
  };

  const prevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + mockPhotos.length) % mockPhotos.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background p-2"
    >
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Live Camera Feed */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Live Camera Feed</h3>
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-black/20">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <Camera className="w-16 h-16 mx-auto mb-2 opacity-60" />
                    <span className="text-sm opacity-80">Camera feed will appear here</span>
                  </div>
                </div>
              </div>
              {isRecording && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Recording
                </div>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <button 
                onClick={handleCapturePhoto}
                className="button flex-1 flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg py-2 px-4 transition-colors"
              >
                <Camera className="w-4 h-4" />
                Capture Photo
              </button>
              <button 
                onClick={handleRecordVideo}
                className={`button flex-1 flex items-center justify-center gap-2 rounded-lg py-2 px-4 transition-colors ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-surface hover:bg-surface/80 text-text border border-border'
                }`}
              >
                {isRecording ? <Pause className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                {isRecording ? 'Stop Recording' : 'Record Video'}
              </button>
            </div>
          </div>
          
          {/* Photo Gallery */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Recent Photos</h3>
            <div className="grid grid-cols-3 gap-2">
              {mockPhotos.slice(0, 6).map((photo, index) => (
                <div key={photo.id} className="relative group cursor-pointer">
                  <img
                    src={photo.url}
                    alt={`Photo ${photo.id}`}
                    className="w-full aspect-square object-cover rounded-lg hover:opacity-80 transition-opacity"
                    onClick={() => {
                      setSelectedPhotoIndex(index);
                      handleViewGallery();
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg">
                    <div className="absolute bottom-1 left-1 text-white text-xs opacity-0 group-hover:opacity-100">
                      {photo.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={handleViewGallery}
              className="button w-full mt-4 flex items-center justify-center gap-2 bg-surface hover:bg-surface/80 text-text border border-border rounded-lg py-2 px-4 transition-colors"
            >
              <Grid className="w-4 h-4" />
              View Gallery
            </button>
          </div>
          
          {/* Face Recognition */}
          <div className="card lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Face Recognition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Known Faces</h4>
                <div className="space-y-2">
                  {knownFaces.map((person) => (
                    <div 
                      key={person.id} 
                      className="flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-surface/80 cursor-pointer transition-colors"
                      onClick={() => handlePersonClick(person)}
                    >
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary-500"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-text-light flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Last seen: {person.lastSeen}
                        </div>
                      </div>
                      <div className="text-xs text-text-light">
                        {person.detections} detections
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Recent Detections</h4>
                <div className="space-y-2">
                  {recentDetections.map((detection) => (
                    <div 
                      key={detection.id} 
                      className={`p-3 bg-surface rounded-lg transition-colors ${
                        detection.type === 'known' ? 'hover:bg-surface/80 cursor-pointer' : ''
                      }`}
                      onClick={() => handleDetectionClick(detection)}
                    >
                      <div className="flex items-center gap-2">
                        <Eye className={`w-4 h-4 ${
                          detection.type === 'known' ? 'text-green-500' : 'text-yellow-500'
                        }`} />
                        <div className="text-sm font-medium">{detection.message}</div>
                      </div>
                      <div className="text-xs text-text-light mt-1">{detection.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Face Profile Modal */}
      <FaceProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        person={selectedPerson}
        onSave={handlePersonSave}
        onApiCall={handleApiCall}
      />

      {/* Gallery Modal */}
      <Modal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        title="Photo Gallery"
        size="xl"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium">All Photos ({mockPhotos.length})</h4>
            <button
              onClick={() => setIsGalleryModalOpen(false)}
              className="p-2 hover:bg-surface rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Photo Viewer */}
          <div className="relative mb-6">
            <img
              src={mockPhotos[selectedPhotoIndex].url}
              alt={`Photo ${mockPhotos[selectedPhotoIndex].id}`}
              className="w-full h-96 object-cover rounded-lg"
            />
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {mockPhotos[selectedPhotoIndex].date} at {mockPhotos[selectedPhotoIndex].time}
            </div>
          </div>
          
          {/* Thumbnail Grid */}
          <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
            {mockPhotos.map((photo, index) => (
              <div key={photo.id} className="relative group cursor-pointer">
                <img
                  src={photo.url}
                  alt={`Photo ${photo.id}`}
                  className={`w-full aspect-square object-cover rounded-lg transition-all ${
                    index === selectedPhotoIndex 
                      ? 'ring-2 ring-primary-500 opacity-100' 
                      : 'hover:opacity-80'
                  }`}
                  onClick={() => setSelectedPhotoIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
      
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

export default VisionMedia;