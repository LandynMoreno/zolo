# Changelog

All notable changes to the Zolo Robot GUI will be documented in this file.

## [2025-07-07] - Major GUI Enhancements

### Added
- **GitHub Activity Widget**: Simplified 5x6 grid showing contributions for the past 30 days
- **Enhanced Calendar Widget**: 
  - Renamed from "Schedule" to "Calendar"
  - Added mini calendar preview with colored event dots
  - Improved event visualization and navigation
- **Floating Quick Actions**: 
  - Implemented accessible floating action button for 7-inch touchscreen
  - Smooth animations for expanding/collapsing actions
  - Touch-optimized interface for Take Photo, Music Control, and Emergency Stop
- **Improved Battery Component**: 
  - Professional battery visualization with proper fill animation
  - Status indicators (Excellent, Good, Low, Critical)
  - Gradient effects and smooth transitions
- **Widget Management System**: 
  - New Widgets section in Settings for toggling dashboard widgets
  - Drag-and-drop reordering functionality
  - Widget preview and GitHub integration status
- **API Keys Management**: 
  - Secure API key storage in Profile settings
  - Support for CHUTES Voice Model, GitHub, and OpenAI APIs
  - Show/hide functionality for sensitive data
- **Enhanced Theme System**: 
  - Clear distinction between preset themes and custom colors
  - Save button for custom color schemes
  - Improved theme selection interface
- **Color Names**: Added descriptive names to all quick color selections in LED Designer

### Changed
- **Photo Gallery Modal**: Removed duplicate X buttons and "All Photos" header line
- **Music Page**: 
  - Replaced album content with dummy "Feel Good Playlist"
  - Added diverse dummy songs and artists
  - Updated voice command examples
- **Dashboard Layout**: Removed static quick actions card in favor of floating button

### Fixed
- Theme settings now properly separate preset and custom modes
- Modal consistency across the application
- Battery percentage visualization accuracy
- Calendar event dot positioning and color consistency

### Technical Improvements
- Enhanced component modularity and reusability
- Consistent state management patterns across all new components
- Improved responsive design for various screen sizes
- Better accessibility support for touch interfaces
- Performance optimizations for animations and transitions

## [Previous Updates]
- Initial React GUI implementation with modern design
- Complete dashboard with widgets and robot status monitoring
- Comprehensive settings system with theme customization
- Multi-page navigation with music, photos, LED designer, and profile management