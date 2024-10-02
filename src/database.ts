import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';
import { MusicFile } from './types';

const dbPath = path.join(app.getPath('userData'), 'musicLibrary.sqlite');
const db = new Database(dbPath);

// Initialize the database
db.exec(`
  CREATE TABLE IF NOT EXISTS music_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT UNIQUE,
    title TEXT,
    artist TEXT,
    album TEXT,
    year INTEGER,
    genre TEXT
  )
`);

export function saveMusicFiles(musicFiles: MusicFile[]): void {
  const insert = db.prepare(`
    INSERT OR REPLACE INTO music_files (path, title, artist, album, year, genre)
    VALUES (@path, @title, @artist, @album, @year, @genre)
  `);

  const insertMany = db.transaction((files: MusicFile[]) => {
    for (const file of files) {
      insert.run({
        path: file.path,
        title: file.metadata.title,
        artist: file.metadata.artist,
        album: file.metadata.album,
        year: file.metadata.year,
        genre: file.metadata.genre ? file.metadata.genre.join(', ') : null
      });
    }
  });

  insertMany(musicFiles);
}

export function loadMusicFiles(): MusicFile[] {
  const query = db.prepare('SELECT * FROM music_files');
  const rows = query.all();
  return rows.map(row => ({
    path: row.path,
    metadata: {
      title: row.title,
      artist: row.artist,
      album: row.album,
      year: row.year,
      genre: row.genre ? row.genre.split(', ') : []
    }
  }));
}