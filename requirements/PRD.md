# Based: A music library manager for the future - Product Requirements Document


## Tech Stack
- Tauri + VueJS + Vite
- TailwindCSS
- SQLite for local storage
- Supabase for cloud storage
- Clerk for authentication

## User Interface

### Music Library

* If no music library is found, the user should be prompted to select a music library.
* The music library should be scanned and indexed.
  * This should be done by the backend. 
  * The backend should provide an API for the frontend to query the music library. 
* The music library should be displayed in a table with the following information: 
  * Play button
  * Album
  * Artist
  * Title
  * Genre
  * Year
  * Duration

### Music Player

- The music player should be displayed at the bottom of the screen.
- When no song is selected, the music player should display a "No song selected" message.
- A user should be able to select a song from the music library by clicking on the play button.
- The song should play in the music player.
- The music player should display the song title, artist, album, and duration.
- The music player should display the current playback time and the total duration of the song.
- The music player should have play, pause, stop, and skip functions.
- The music player should have a volume control.

