import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart, Plus, X, Edit, Music, List, Search, Camera } from 'lucide-react';
import Modal from '../components/shared/Modal';
import ApiNotification from '../components/shared/ApiNotification';

/**
 * Music & Audio page - The awesome music experience with visualizers
 * Features music player, playlists, and audio visualization with full functionality
 */
const MusicAudio = () => {
  const [notifications, setNotifications] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(83); // 1:23 in seconds
  const [duration, setDuration] = useState(240); // 4:00 in seconds
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: repeat all, 2: repeat one
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistCover, setNewPlaylistCover] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState(null); // Currently playing playlist
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

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

  const songs = [
    {
      id: 1,
      title: 'Summer Vibes',
      artist: 'The Demo Band',
      album: 'Feel Good Playlist',
      duration: 210,
      cover: 'https://picsum.photos/300/300?random=401'
    },
    {
      id: 2,
      title: 'Digital Dreams',
      artist: 'Electronic Collective',
      album: 'Feel Good Playlist',
      duration: 245,
      cover: 'https://picsum.photos/300/300?random=401'
    },
    {
      id: 3,
      title: 'Midnight Drive',
      artist: 'Synthwave Studio',
      album: 'Feel Good Playlist',
      duration: 267,
      cover: 'https://picsum.photos/300/300?random=401'
    },
    {
      id: 4,
      title: 'Ocean Waves',
      artist: 'Chill Masters',
      album: 'Feel Good Playlist',
      duration: 198,
      cover: 'https://picsum.photos/300/300?random=401'
    },
    {
      id: 5,
      title: 'Morning Coffee',
      artist: 'Jazz Ensemble',
      album: 'Feel Good Playlist',
      duration: 223,
      cover: 'https://picsum.photos/300/300?random=401'
    }
  ];

  const playlists = [
    { 
      id: 1, 
      name: 'Feel Good Playlist', 
      count: 5, 
      cover: 'https://picsum.photos/300/300?random=401',
      description: 'Uplifting songs to brighten your day'
    },
    { 
      id: 2, 
      name: 'Robot Beats', 
      count: 8, 
      cover: 'https://picsum.photos/200/200?random=201',
      description: 'Electronic music for robots'
    },
    { 
      id: 3, 
      name: 'Chill Mode', 
      count: 15, 
      cover: 'https://picsum.photos/200/200?random=202',
      description: 'Relaxing ambient sounds'
    },
    { 
      id: 4, 
      name: 'Focus Time', 
      count: 20, 
      cover: 'https://picsum.photos/200/200?random=203',
      description: 'Concentration and productivity music'
    }
  ];

  const upNextSongs = [
    { id: 6, title: 'Starlight', artist: 'Dream Pop Collective', cover: 'https://picsum.photos/100/100?random=501' },
    { id: 7, title: 'Gentle Morning', artist: 'Calm Collective', cover: 'https://picsum.photos/100/100?random=301' },
    { id: 8, title: 'Robot Dance', artist: 'Electronic Dreams', cover: 'https://picsum.photos/100/100?random=302' },
    { id: 9, title: 'Forest Sounds', artist: 'Nature Collective', cover: 'https://picsum.photos/100/100?random=303' },
    { id: 10, title: 'Urban Rhythm', artist: 'City Beats', cover: 'https://picsum.photos/100/100?random=502' }
  ];

  // Set default playlist on component mount
  useEffect(() => {
    if (!currentPlaylist && playlists.length > 0) {
      setCurrentPlaylist(playlists[0]);
      setSelectedPlaylist(playlists[0]);
    }
  }, [currentPlaylist, playlists]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    handleApiCall(`Would be calling API_ROUTE="/api/music/${isPlaying ? 'pause' : 'play'}" for ${isPlaying ? 'pausing' : 'playing'} music`);
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    handleApiCall('Would be calling API_ROUTE="/api/music/next" for playing next song');
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const handlePrevious = () => {
    handleApiCall('Would be calling API_ROUTE="/api/music/previous" for playing previous song');
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleVolumeChange = (newVolume) => {
    handleApiCall(`Would be calling API_ROUTE="/api/music/volume" for setting volume to ${newVolume}%`);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleShuffle = () => {
    handleApiCall(`Would be calling API_ROUTE="/api/music/shuffle" for ${isShuffleOn ? 'disabling' : 'enabling'} shuffle mode`);
    setIsShuffleOn(!isShuffleOn);
  };

  const handleRepeat = () => {
    const newMode = (repeatMode + 1) % 3;
    const modes = ['disabling', 'enabling repeat all', 'enabling repeat one'];
    handleApiCall(`Would be calling API_ROUTE="/api/music/repeat" for ${modes[newMode]} repeat mode`);
    setRepeatMode(newMode);
  };

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsPlaylistModalOpen(true);
  };

  const handlePlayPlaylist = (playlist) => {
    handleApiCall(`Would be calling API_ROUTE="/api/playlists/${playlist.id}/play" for playing ${playlist.name} playlist`);
    setCurrentPlaylist(playlist);
    setCurrentSong(0); // Start from first song
    setIsPlaying(true);
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      handleApiCall('Would be calling API_ROUTE="/api/playlists" for creating new playlist');
      setNewPlaylistName('');
      setNewPlaylistCover('');
      setIsCreatePlaylistModalOpen(false);
    }
  };

  const handleTakePlaylistPhoto = () => {
    handleApiCall('Would be calling API_ROUTE="/api/camera/capture" for taking playlist cover photo');
    setIsCameraModalOpen(true);
  };

  const handlePlaylistPhotoCapture = (photoUrl) => {
    setNewPlaylistCover(photoUrl);
    setIsCameraModalOpen(false);
    handleApiCall('Would be calling API_ROUTE="/api/media/save-playlist-cover" for saving playlist cover photo');
  };

  const progressPercentage = (currentTime / duration) * 100;
  const current = songs[currentSong];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background p-2"
    >
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          {/* Currently Playing Playlist - Main Feature */}
          <div className="lg:col-span-3 card">
            <h3 className="text-xl font-semibold mb-6">Currently Playing Playlist</h3>
            
            {currentPlaylist && (
              <>
                {/* Playlist Art and Info */}
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="w-48 h-48 mx-auto md:mx-0 relative group">
                    <img
                      src={currentPlaylist.cover}
                      alt={currentPlaylist.name}
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-xl flex items-center justify-center">
                      <button
                        onClick={handlePlayPause}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-4 bg-white/90 rounded-full text-black"
                      >
                        {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-2">{currentPlaylist.name}</h2>
                    <p className="text-text-light mb-2">{currentPlaylist.description}</p>
                    <p className="text-text-light mb-3">{currentPlaylist.count} songs</p>
                    
                    {/* Currently Playing Song */}
                    <div className="bg-surface rounded-lg p-3 mb-4">
                      <p className="text-sm text-text-light mb-1">Now Playing:</p>
                      <p className="font-semibold">{current.title}</p>
                      <p className="text-sm text-text-light">{current.artist}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleApiCall('Would be calling API_ROUTE="/api/music/like" for liking current song')}
                        className="p-2 rounded-full hover:bg-surface transition-colors"
                        title="Like current song"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-text-light mb-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2 cursor-pointer">
                        <div 
                          className="bg-primary-500 h-2 rounded-full transition-all" 
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button 
                onClick={handleShuffle}
                className={`p-3 rounded-full transition-colors ${isShuffleOn ? 'text-primary-500 bg-primary-500/10' : 'hover:bg-surface'}`}
              >
                <Shuffle size={20} />
              </button>
              <button onClick={handlePrevious} className="p-3 rounded-full hover:bg-surface transition-colors">
                <SkipBack size={24} />
              </button>
              <button 
                onClick={handlePlayPause}
                className="p-4 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>
              <button onClick={handleNext} className="p-3 rounded-full hover:bg-surface transition-colors">
                <SkipForward size={24} />
              </button>
              <button 
                onClick={handleRepeat}
                className={`p-3 rounded-full transition-colors ${repeatMode > 0 ? 'text-primary-500 bg-primary-500/10' : 'hover:bg-surface'}`}
              >
                <Repeat size={20} />
                {repeatMode === 2 && <span className="absolute -top-1 -right-1 text-xs">1</span>}
              </button>
            </div>
            
            {/* Audio Visualizer */}
            <div className="mb-4">
              <h4 className="font-medium mb-3">Audio Visualizer</h4>
              <div className="h-32 bg-surface rounded-lg flex items-end justify-center gap-1 p-4">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 rounded-t transition-colors ${isPlaying ? 'bg-primary-500' : 'bg-border'}`}
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                    animate={isPlaying ? { 
                      height: [`${Math.random() * 80 + 20}%`, `${Math.random() * 80 + 20}%`]
                    } : {}}
                    transition={{ 
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: isPlaying ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full hover:bg-surface transition-colors"
              >
                <Volume2 size={20} className={isMuted ? 'text-red-500' : ''} />
              </button>
              <div className="flex-1 bg-border rounded-full h-2 cursor-pointer"
                   onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const x = e.clientX - rect.left;
                     const percentage = (x / rect.width) * 100;
                     handleVolumeChange(Math.round(percentage));
                   }}>
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all" 
                  style={{ width: `${isMuted ? 0 : volume}%` }}
                ></div>
              </div>
              <span className="text-sm text-text-light min-w-[3rem]">{isMuted ? '0%' : `${volume}%`}</span>
            </div>
          </div>
          
          {/* Playlist and Library */}
          <div className="lg:col-span-2 space-y-3">
            {/* Quick Playlists */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Playlists</h3>
                <button
                  onClick={() => setIsCreatePlaylistModalOpen(true)}
                  className="p-2 rounded-full hover:bg-surface transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {playlists.map((playlist) => (
                  <div 
                    key={playlist.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-surface transition-colors cursor-pointer ${
                      currentPlaylist?.id === playlist.id ? 'bg-primary-500/10 border border-primary-500/20' : ''
                    }`}
                  >
                    <div className="relative group">
                      <img
                        src={playlist.cover}
                        alt={playlist.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPlaylist(playlist);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white/90 rounded-full text-black"
                        >
                          <Play size={16} />
                        </button>
                      </div>
                    </div>
                    <div 
                      className="flex-1 min-w-0"
                      onClick={() => handlePlaylistClick(playlist)}
                    >
                      <div className="font-medium truncate">{playlist.name}</div>
                      <div className="text-sm text-text-light">{playlist.count} songs</div>
                    </div>
                    {currentPlaylist?.id === playlist.id && isPlaying && (
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Voice Commands */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Voice Commands</h3>
              <div className="text-center mb-4">
                <button
                  onClick={() => handleApiCall('Would be calling API_ROUTE="/api/voice/listen" for starting voice command recognition')}
                  className="w-16 h-16 bg-primary-500 rounded-full mx-auto flex items-center justify-center mb-3 hover:bg-primary-600 transition-colors"
                >
                  <motion.div
                    className="w-8 h-8 bg-white rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                </button>
                <p className="text-sm text-text-light">Tap to listen or say "Play music"</p>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-text-light">Recent commands:</div>
                <div className="text-sm bg-surface rounded p-2">"Play Feel Good Playlist"</div>
                <div className="text-sm bg-surface rounded p-2">"Volume up"</div>
                <div className="text-sm bg-surface rounded p-2">"Next song"</div>
              </div>
            </div>
            
            {/* Current Queue */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Up Next</h3>
              <div className="space-y-2">
                {upNextSongs.map((song, i) => (
                  <div 
                    key={song.id} 
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors cursor-pointer"
                    onClick={() => handleApiCall(`Would be calling API_ROUTE="/api/music/play-song/${song.id}" for playing ${song.title}`)}
                  >
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{song.title}</div>
                      <div className="text-xs text-text-light truncate">{song.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Modal */}
      <Modal
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
        title={selectedPlaylist?.name || 'Playlist'}
        size="lg"
      >
        {selectedPlaylist && (
          <div className="p-6">
            <div className="flex items-start gap-6 mb-6">
              <img
                src={selectedPlaylist.cover}
                alt={selectedPlaylist.name}
                className="w-32 h-32 object-cover rounded-lg shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{selectedPlaylist.name}</h3>
                <p className="text-text-light mb-4">{selectedPlaylist.description}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleApiCall(`Would be calling API_ROUTE="/api/playlists/${selectedPlaylist.id}/play" for playing playlist`)}
                    className="button bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </button>
                  <button
                    onClick={() => handleApiCall(`Would be calling API_ROUTE="/api/playlists/${selectedPlaylist.id}/shuffle" for shuffling playlist`)}
                    className="button bg-surface border border-border px-6 py-2 rounded-lg hover:bg-surface/80"
                  >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Shuffle
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium mb-3">Songs ({selectedPlaylist.count})</h4>
              {songs.map((song, index) => (
                <div 
                  key={song.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface transition-colors cursor-pointer"
                  onClick={() => handleApiCall(`Would be calling API_ROUTE="/api/music/play-song/${song.id}" for playing ${song.title}`)}
                >
                  <span className="text-sm text-text-light w-6">{index + 1}</span>
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{song.title}</div>
                    <div className="text-sm text-text-light">{song.artist}</div>
                  </div>
                  <span className="text-sm text-text-light">{formatTime(song.duration)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Create Playlist Modal */}
      <Modal
        isOpen={isCreatePlaylistModalOpen}
        onClose={() => setIsCreatePlaylistModalOpen(false)}
        title="Create Playlist"
        size="md"
      >
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Playlist Name</label>
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                placeholder="Enter playlist name..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Cover Image</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newPlaylistCover}
                  onChange={(e) => setNewPlaylistCover(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-lg bg-background"
                  placeholder="https://example.com/cover.jpg"
                />
                <button
                  onClick={handleTakePlaylistPhoto}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
                  title="Take photo for playlist cover"
                >
                  <Camera className="w-4 h-4" />
                  Photo
                </button>
              </div>
            </div>

            {newPlaylistCover && (
              <div>
                <label className="block text-sm font-medium mb-2">Preview</label>
                <img
                  src={newPlaylistCover}
                  alt="Playlist cover preview"
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleCreatePlaylist}
                className="flex-1 button bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600"
                disabled={!newPlaylistName.trim()}
              >
                Create Playlist
              </button>
              <button
                onClick={() => setIsCreatePlaylistModalOpen(false)}
                className="flex-1 button bg-surface border border-border py-2 rounded-lg hover:bg-surface/80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Camera Modal for Playlist Covers */}
      <Modal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        title="Take Playlist Cover Photo"
        size="lg"
      >
        <div className="p-6">
          <div className="space-y-4">
            {/* Camera Preview */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Camera preview would appear here</p>
                </div>
              </div>
            </div>
            
            {/* Capture Controls */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => {
                  const mockPhotoUrl = `https://picsum.photos/300/300?random=${Date.now()}`;
                  handlePlaylistPhotoCapture(mockPhotoUrl);
                }}
                className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
                title="Capture photo"
              >
                <Camera className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsCameraModalOpen(false)}
                className="flex-1 button bg-surface border border-border py-2 rounded-lg hover:bg-surface/80"
              >
                Cancel
              </button>
            </div>
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

export default MusicAudio;