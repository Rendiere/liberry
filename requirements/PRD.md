# Project: Cross-Platform Music Library Application

## Tech Stack

### Frontend
- **Framework**: Vue.js (with TypeScript)
- **Component Library**: Naive UI
- **Bundler**: Vite

### Backend
- **Main Process**: Electron (with TypeScript) for desktop application
- **Preload Script**: TypeScript for secure IPC between the main and renderer processes
- **Database ORM**: Prisma (with SQLite) for local database management

### Integration and External Services
- **Authentication**: Clerk (future integration)
- **Backend Storage/Database**: Supabase (future integration for cloud sync)
- **Streaming Service Integration**: Spotify API (initial MVP)

### Other Tools and Libraries
- **Node.js**: JavaScript runtime for backend
- **TypeScript**: Strongly typed language for better reliability and maintainability
- **Electron IPC**: To communicate securely between the main process and the Vue renderer

## Folder Structure
\`\`\`
music-library-app/
├── src/
│   ├── main/          # Main process
│   │   ├── main.ts    # Electron entry file
│   │   └── preload.ts # Preload script for secure IPC
│   ├── renderer/      # Renderer process
│   │   ├── App.vue    # Vue root component
│   │   ├── index.html # HTML template for the renderer
│   │   └── app.ts     # Renderer entry file (Vue setup)
├── package.json
├── tsconfig.json
└── vite.config.ts     # Vite configuration file for Vue
\`\`\`

## User Interface Requirements

### Overall Layout
- The application will have a two-pane layout separated by a draggable split component.
- A "Now Playing" bar will span the entire bottom of the application.

### Left Navigation Pane
- Located on the left side of the application.
- Contains a search component at the top.
- Displays a "Library" section with subsections:
  - Songs
  - Albums
  - Artists
- [Future expansion] Will include other sections like "Apple Music", "Radio", etc.

### Main Content Area
- Located on the right side of the split pane.
- Displays content based on the selected item in the left navigation.
- For the "Songs" view, it shows a data table with song information.

### Now Playing Bar
- Located at the bottom of the application, spanning the entire width.
- Contains:
  - Play/Pause button
  - Next and Previous buttons
  - Song details (Title, Album) in the middle
  - Volume slider on the right

### Library View (Songs)
- Displayed in the main content area when "Songs" is selected.
- Uses a Data Table component to show song information.
- Columns include:
  - Title
  - Artist
  - Album
  - Time (duration)
  - Year

## Functional Requirements

### Search Functionality
- A search bar in the left navigation pane.
- [Future implementation] Will allow searching across the music library.

### Music Playback Controls
- Play/Pause functionality
- Next/Previous track navigation
- Volume control

### Library Management
- Display of user's music library in a tabular format
- [Future implementation] Sorting and filtering options for the library view

## Development Plan to Build MVP

### 1. Project Initialization
- Create a clean project directory and initialize a new Node.js project.
- Set up TypeScript in the project (\`tsconfig.json\`) and configure it for a modern JavaScript setup.

### 2. Frontend Setup
- Install and configure Vue.js with TypeScript.
- Add Naive UI for Vue components.
- Use vfonts for fonts
- Use xicons for icons
- Create a minimal folder structure with necessary Vue components (\`App.vue\`) and HTML files.
- Install and configure Vite to compile Vue files and bundle the application.

### 3. Electron Integration
- Install Electron and configure it as a development dependency.
- Create the \`main.ts\` file to define the Electron main process (e.g., creating the main window).
- Create \`preload.ts\` for secure IPC communication between the main process and renderer.
- Set up the main Electron process to load the Vue app from \`index.html\`.

### 4. Database Integration
- Install Prisma and set up SQLite as the local database.
- Define a basic Prisma schema to store music library information.
- Generate the Prisma client and integrate it with the Electron main process.

### 5. Vue and Electron Communication
- Write a preload script (\`preload.ts\`) to enable communication between the Vue renderer and Electron main process using IPC.
- Update the Vue app to use IPC for interactions that require backend logic (e.g., accessing local music files, syncing data).

### 6. Spotify API Integration
- Create a service in Vue to interact with the Spotify API, using it to fetch music metadata.
- Implement a basic UI in Vue (\`App.vue\`) to display Spotify music alongside locally stored files.

### 7. User Interface Development
- Use Naive UI to create the main layout for the music library, with features such as playlists and adding music.
- Develop features for browsing, searching, and playing music from both local files and Spotify.

### 8. Testing and Debugging
- Test integration between Vue and Electron (including IPC).
- Test database read/write operations locally using Prisma.
- Ensure the UI is responsive and functional across different operating systems (Windows, macOS, Linux).

### 9. Final Steps for MVP
- Package the application for different platforms using Electron.
- Perform basic user testing to ensure stability.
- Prepare documentation for installation and usage.

## Future Enhancements
- **Add Authentication**: Integrate Clerk for user authentication.
- **Cloud Sync**: Use Supabase to store user data in the cloud and enable syncing between devices.
- **Freemium Model**: Develop features that differentiate between free and premium versions of the application.

## Development Phases

### Phase 1: Basic UI Implementation
- Set up the two-pane layout with draggable split
- Implement the left navigation pane with search bar and Library section
- Create the Now Playing bar with basic controls
- Implement the Library view with a data table for Songs

### Phase 2
