# Based: A music library manager for the future - Product Requirements Document

## 1. User Interface
- Modern, web-like interface for rapid development and iteration
- NextJS + Electron (nextron) based desktop application
- TailwindCSS for styling

### 1.1 Main Layout
- Familiar music library layout with refreshing, modern design
- Columns with sticky headers for easy navigation
- Rows representing individual tracks
- In-place editing for track properties
- Resizable and reorderable columns

### 1.2 Playback Controls
- Persistent top panel displaying currently playing track
- Basic playback controls (play, pause, skip, volume)
- Progress bar for track position

### 1.3 Sidebar
- Two level sidebar, with highlighting for current page and folding sections. Each top level section should have a button to jump to the most recent activity for that section and have an icon.
- Listen:
  - All Tracks
  - Playlists section with sub-sections for each playlist
- Manage:
  - Library Cleaner
  - Tagging System
- Create:
  - Genius Playlist
  - DJ Sets
  - Mixtapes




### 1.4 Library Management UI
- Statistics toast notification showing library health
- Clickable toast to view detailed error report
- Error resolution interface:
  - List of issues categorized by type (missing metadata, duplicate tracks, etc.)
  - Option to manually address each issue
  - "Fix Automatically" button for bulk error resolution
- Progress indicator for ongoing library management tasks

### 1.5 Playlist Management
- Create, edit, and delete playlists
- Drag-and-drop interface for adding tracks to playlists
- Smart playlist creation based on rules and filters

### 1.6 Search and Filter
- Global search bar with type-ahead suggestions
- Advanced filtering options for precise library navigation
- Can see the source of all tracks [Local files, Spotify, Discogs and (importantly) Vinyl]
  - User can filter by source
  - Can use Discogs library to determine tracks in vinyl

## 2. Music Library Integration
- Option to upload iTunes library file
- Option to scan specified folder for audio files
- Ability to load and display entire music library
- Ability to link Spotify account and see all tracks in library
- Ability to link Discogs account and see all tracks in library

## 3. AI Features
### 3.1 Genius Playlist Creation
- Text box for description-based playlist creation
- Form-like questionnaire for guided playlist creation
- Single-song selection for "create genius playlist" feature

### 3.2 Song Matching Feature (Premium)
- Dedicated feature panel
- Waveform display of selected song
- 30-second window selection on waveform
- Matching options: beat (bass), melody (mids), highs, or all combined
- Display top N matching tracks based on selection
- Utilize vector database and similarity search on audio embeddings

## 4. Rekordbox Integration
- Export playlists compatible with Rekordbox
- Write music metadata directly to audio files (ID3 tags)
- Focus on complementing Rekordbox workflow, not replacing it

## 5. Collection Organization
- Implement opinionated organization system
- Flexible structure to accommodate different user personas:
  1. DJs managing large libraries and crafting sets
  2. Music collectors focusing on listening and playlist creation
- Tagging system (details to be refined)

## 6. Library Cleaning Features
- Automatic metadata gap filling:
  - Extract artist name from track title
  - Fetch missing genre and year information from third-party sources (iTunes, Spotify, Discogs)

## 7. Performance Considerations
- Support for background compute-heavy tasks
- Efficient memory management (load only necessary data)
- Scalable architecture for future performance optimizations

## 8. Platform Support
- Primary focus on macOS
- Architecture designed for future Windows support

## 9. General Features
- Library view with sorting and filtering options
- Playlist creation and management
- Audio player with basic playback controls
- Search functionality across the entire library

## 10. User Experience
- Intuitive navigation between library, playlists, and AI features
- Smooth transitions and responsive design
- Clear visual feedback for background tasks and processes



Important Notes:
* UI design mockups can be found under the design/ui folder. All pages should be responsive and match the designs.