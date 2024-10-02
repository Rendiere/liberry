# Music Collector App Product Requirements Document (PRD)

## Project Overview

The Music Collector App is a comprehensive platform designed for music enthusiasts, DJs, and professional musicians. It unifies various music platforms (local files, streaming services, and vinyl collections) into a single, intuitive interface. The app allows users to view, curate, and interact with their entire music collection across different platforms, play music from various sources, and maintain a high-quality, well-organized music library by leveraging metadata from multiple sources.

## Tech Stack

- Electron: Cross-platform desktop app framework
- Vue.js: Frontend framework
- Vite: Build tool and development server
- Tailwind CSS: Utility-first CSS framework for styling
- SQLite: Local database for offline functionality and persistent storage
- music-metadata: Library for parsing music metadata

## Core Functionality

### Unified Music Library
- As a user, I can view my entire music collection from various sources (local files, Spotify, Discogs) in a single interface
- As a user, I can sort and filter my unified library by various criteria (e.g., platform, genre, artist, year)
- As a user, I can search across my entire collection regardless of the music's source
- As a user, I can see my music library in a custom table format with editable fields

### Local Storage and Persistence
- As a user, I only need to scan my local music files once, after which the parsed data is stored in a local SQLite database
- As a user, I can quickly load my music library from the local database without rescanning files

### Cross-Platform Playback
- As a user, I can play local music files directly within the app
- As a user, I can stream music from connected platforms (e.g., Spotify) without leaving the app
- As a user, I can create and manage playlists that include tracks from multiple sources
- As a user, I can see a persistent "Now Playing" bar at the bottom of the screen

### Metadata Management
- As a user, I can view detailed metadata for any track in my collection
- As a user, I can edit metadata directly in the table view by right-clicking on a field
- As a user, I can automatically fill in missing metadata for local files using information from Spotify or Discogs
- As a user, I can manually edit and update metadata for any track in my collection
- As a user, I can batch update metadata for multiple tracks simultaneously

### Platform Integration
- As a user, I can connect my Spotify account to import my playlists and liked songs
- As a user, I can connect my Discogs account to import my vinyl collection
- As a user, I can scan local directories to import my local music files
- As a user, I can sync changes made in the app back to the respective platforms (where applicable)

### Collection Curation
- As a user, I can create custom tags to organize my music across platforms
- As a user, I can create smart playlists based on various criteria from my unified library
- As a user, I can export my curated playlists to connected platforms (e.g., Spotify)

### User Interface
- As a user, I can interact with a clean, intuitive interface similar to the provided example image
- As a user, I can see a persistent "Now Playing" bar at the bottom of the screen
- As a user, I can view my music library in a custom table format with easily editable fields

## Supporting Docs

- Electron API: https://www.electronjs.org/docs/latest/
- Vue.js Guide: https://vuejs.org/guide/introduction.html
- Vite Documentation: https://vitejs.dev/guide/
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- Supabase Documentation: https://supabase.com/docs
- SQLite Documentation: https://www.sqlite.org/docs.html
- Clerk Documentation: https://clerk.com/docs
- Spotify Web API: https://developer.spotify.com/documentation/web-api/
- Discogs API: https://www.discogs.com/developers/
- music-metadata library: https://github.com/borewit/music-metadata#readme

## Current File Structure

```
music-collector-app/
├── package.json
├── vite.config.js
├── electron.vite.config.js
├── tailwind.config.js
├── index.html
├── src/
│   ├── main.js              # Electron main process
│   ├── preload.js           # Preload script for Electron
│   ├── App.vue              # Root Vue component
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── LibraryView.vue
│   │   ├── NowPlaying.vue
│   │   └── Sidebar.vue
│   ├── views/
│   │   ├── Home.vue
│   │   ├── Library.vue
│   │   └── Settings.vue
│   ├── store/
│   │   └── index.js         # Vuex store
│   ├── router/
│   │   └── index.js         # Vue Router
│   ├── services/
│   │   ├── spotify.js
│   │   ├── discogs.js
│   │   └── localLibrary.js
│   └── utils/
│       └── metadata.js
├── public/
│   └── favicon.ico
└── electron/
    ├── main.js
    └── preload.js
```

This structure provides a solid foundation for the Music Collector App, separating concerns and organizing code in a logical manner. As development progresses, new components, views, and services can be added to their respective directories.
