import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Signal, Globe, Lock, Check } from 'lucide-react';
import Modal from '../shared/Modal';

const NetworkSettings = ({ onApiCall }) => {
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const availableNetworks = [
    { id: 1, name: 'ZoloRobot_Network', strength: 'Strong', signal: -45, secure: true, connected: true },
    { id: 2, name: 'HomeWiFi_5G', strength: 'Excellent', signal: -35, secure: true, connected: false },
    { id: 3, name: 'NeighborNetwork', strength: 'Good', signal: -65, secure: true, connected: false },
    { id: 4, name: 'Coffee_Shop_WiFi', strength: 'Fair', signal: -75, secure: false, connected: false },
    { id: 5, name: 'Guest_Network', strength: 'Weak', signal: -85, secure: false, connected: false },
  ];

  const handleChangeNetwork = () => {
    onApiCall('Would be calling API_ROUTE="/api/settings/network/scan" for scanning available networks');
    setIsNetworkModalOpen(true);
  };

  const handleNetworkReconnect = () => {
    onApiCall('Would be calling API_ROUTE="/api/settings/network/reconnect" for reconnecting to network');
  };

  const handleNetworkSelect = (network) => {
    if (network.connected) return;
    setSelectedNetwork(network);
    setPassword('');
  };

  const handleConnect = () => {
    if (!selectedNetwork) return;
    
    setIsConnecting(true);
    onApiCall(`Would be calling API_ROUTE="/api/settings/network/connect" for connecting to ${selectedNetwork.name}`);
    
    setTimeout(() => {
      setIsConnecting(false);
      setIsNetworkModalOpen(false);
      setSelectedNetwork(null);
      setPassword('');
    }, 2000);
  };

  const getSignalIcon = (strength) => {
    const icons = {
      'Excellent': '▂▃▅▆▇',
      'Strong': '▂▃▅▆',
      'Good': '▂▃▅',
      'Fair': '▂▃',
      'Weak': '▂'
    };
    return icons[strength] || '▂';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Wifi size={24} />
          WiFi Connection
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-green-500/20">
            <div className="flex items-center gap-3">
              <Signal className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium">ZoloRobot_Network</div>
                <div className="text-sm text-text-light">Connected • Strong signal</div>
              </div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleChangeNetwork}
              className="button flex-1 bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Change Network
            </button>
            <button 
              onClick={handleNetworkReconnect}
              className="button flex-1 bg-surface border border-border py-2 rounded-lg hover:bg-surface/80 transition-colors"
            >
              Reconnect
            </button>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe size={24} />
          Network Information
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-medium">IP Address</span>
            <span className="text-text-light font-mono">192.168.1.100</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-medium">MAC Address</span>
            <span className="text-text-light font-mono">AA:BB:CC:DD:EE:FF</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-medium">Signal Strength</span>
            <span className="text-green-500 font-medium">Excellent (-45 dBm)</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-medium">Download Speed</span>
            <span className="text-text-light">85.3 Mbps</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="font-medium">Gateway</span>
            <span className="text-text-light font-mono">192.168.1.1</span>
          </div>
        </div>
      </div>

      {/* Network Selection Modal */}
      <Modal
        isOpen={isNetworkModalOpen}
        onClose={() => !isConnecting && setIsNetworkModalOpen(false)}
        title="Available Networks"
        size="lg"
      >
        <div className="p-6">
          <div className="space-y-4">
            {/* Network List */}
            <div className="space-y-2">
              {availableNetworks.map((network) => (
                <div
                  key={network.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    network.connected 
                      ? 'border-green-500/50 bg-green-500/10' 
                      : selectedNetwork?.id === network.id
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-border hover:border-primary-500/50 hover:bg-surface'
                  }`}
                  onClick={() => handleNetworkSelect(network)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-5 h-5" />
                        {network.secure && <Lock className="w-4 h-4 text-text-light" />}
                        {network.connected && <Check className="w-4 h-4 text-green-500" />}
                      </div>
                      <div>
                        <div className="font-medium">{network.name}</div>
                        <div className="text-sm text-text-light">
                          {network.strength} • {network.signal} dBm
                          {network.connected && ' • Connected'}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-text-light">
                      {getSignalIcon(network.strength)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Password Input for Secure Networks */}
            {selectedNetwork && selectedNetwork.secure && (
              <div className="space-y-3 p-4 bg-surface rounded-lg">
                <h4 className="font-medium">Connect to {selectedNetwork.name}</h4>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    placeholder="Enter network password"
                    disabled={isConnecting}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsNetworkModalOpen(false)}
                disabled={isConnecting}
                className={`flex-1 button bg-surface border border-border py-2 rounded-lg hover:bg-surface/80 ${
                  isConnecting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Cancel
              </button>
              {selectedNetwork && !selectedNetwork.connected && (
                <button
                  onClick={handleConnect}
                  disabled={isConnecting || (selectedNetwork.secure && !password.trim())}
                  className={`flex-1 button bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 ${
                    isConnecting || (selectedNetwork.secure && !password.trim()) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default NetworkSettings;