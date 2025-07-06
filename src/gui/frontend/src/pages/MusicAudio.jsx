import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

/**
 * Music & Audio page - The awesome music experience with visualizers
 * Features music player, playlists, and audio visualization
 */
const MusicAudio = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background p-4"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-500 mb-8 font-poppins">
          Music & Audio Hub
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Now Playing - Main Feature */}
          <div className="lg:col-span-2 card">
            <h3 className="text-xl font-semibold mb-6">Now Playing</h3>
            
            {/* Album Art and Info */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="w-48 h-48 bg-gradient-to-br from-primary-500 to-accent rounded-xl mx-auto md:mx-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Album Art</span>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-2">Ambient Waves</h2>
                <p className="text-text-light text-lg mb-1">Nature Sounds</p>
                <p className="text-text-light">Peaceful Moments • 2023</p>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-text-light mb-1">
                    <span>1:23</span>
                    <span>4:00</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button className="p-3 rounded-full hover:bg-surface transition-colors">
                <SkipBack size={24} />
              </button>
              <button className="p-4 rounded-full bg-primary-500 text-white hover:bg-accent transition-colors">
                <Play size={28} />
              </button>
              <button className="p-3 rounded-full hover:bg-surface transition-colors">
                <SkipForward size={24} />
              </button>
            </div>
            
            {/* Audio Visualizer Placeholder */}
            <div className="mb-4">
              <h4 className="font-medium mb-3">Audio Visualizer</h4>
              <div className="h-32 bg-surface rounded-lg flex items-end justify-center gap-1 p-4">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-primary-500 w-2 rounded-t"
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                    animate={{ 
                      height: [`${Math.random() * 80 + 20}%`, `${Math.random() * 80 + 20}%`]
                    }}
                    transition={{ 
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <Volume2 size={20} />
              <div className="flex-1 bg-border rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-sm text-text-light">70%</span>
            </div>
          </div>
          
          {/* Playlist and Library */}
          <div className="space-y-6">
            {/* Quick Playlists */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Playlists</h3>
              <div className="space-y-2">
                {[
                  { name: 'Morning Vibes', count: 12 },
                  { name: 'Robot Beats', count: 8 },
                  { name: 'Chill Mode', count: 15 },
                  { name: 'Focus Time', count: 20 }
                ].map((playlist, i) => (
                  <div key={i} className="p-3 rounded-lg hover:bg-surface transition-colors cursor-pointer">
                    <div className="font-medium">{playlist.name}</div>
                    <div className="text-sm text-text-light">{playlist.count} songs</div>
                  </div>
                ))}
              </div>
              <button className="button w-full mt-4">Create Playlist</button>
            </div>
            
            {/* Voice Commands */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Voice Commands</h3>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto flex items-center justify-center mb-3">
                  <motion.div
                    className="w-8 h-8 bg-white rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                </div>
                <p className="text-sm text-text-light">Say "Play music" to start</p>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-text-light">Recent commands:</div>
                <div className="text-sm bg-surface rounded p-2">"Play ambient music"</div>
                <div className="text-sm bg-surface rounded p-2">"Volume up"</div>
              </div>
            </div>
            
            {/* Current Queue */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Up Next</h3>
              <div className="space-y-2">
                {[
                  { title: 'Gentle Morning', artist: 'Calm Collective' },
                  { title: 'Robot Dance', artist: 'Electronic Dreams' },
                  { title: 'Forest Sounds', artist: 'Nature Collective' }
                ].map((song, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary-500 rounded"></div>
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
    </motion.div>
  );
};

export default MusicAudio;