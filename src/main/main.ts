import { app, BrowserWindow, ipcMain, dialog, protocol } from 'electron';
import * as path from 'path';
import * as fs from 'fs/promises';
import prisma from './utils/prisma';
import * as mm from 'music-metadata';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  if (mainWindow) return; // Prevent creating multiple windows

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Handle Prisma Client disconnection on app quit
app.on('before-quit', async () => {
  await prisma.$disconnect();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * IPC Handlers for Database Operations
 */

// Fetch all songs
ipcMain.handle('get-songs', async () => {
  try {
    const songs = await prisma.song.findMany({
      select: {
        id: true,
        title: true,
        artist: true,
        album: true,
        year: true,
        genre: true,
        duration: true,
        filePath: true,
        // Add any other fields you want to display
      }
    });
    return { success: true, data: songs };
  } catch (error) {
    console.error('Error fetching songs:', error);
    return { success: false, error: 'Failed to fetch songs.' };
  }
});

// Example: Add a new song
ipcMain.handle('add-song', async (_event, songData) => {
  try {
    const newSong = await prisma.song.create({
      data: songData,
    });
    return { success: true, data: newSong };
  } catch (error) {
    console.error('Error adding song:', error);
    return { success: false, error: 'Failed to add song.' };
  }
});

// Add more IPC handlers as needed for other operations

ipcMain.handle('import-music', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow!, {
      properties: ['openDirectory']
    });

    if (result.canceled) {
      return { success: false, error: 'Operation canceled' };
    }

    const dir = result.filePaths[0];
    const files = await scanDirectory(dir);
    const importedSongs = await importSongs(files);

    return { success: true, data: { importedCount: importedSongs.length } };
  } catch (error) {
    console.error('Error importing music:', error);
    return { success: false, error: 'Failed to import music.' };
  }
});

ipcMain.handle('load-audio-file', async (event, filePath) => {
  try {
    const fileBuffer = await fs.readFile(filePath);
    return fileBuffer.toString('base64');
  } catch (error) {
    console.error('Error loading audio file:', error);
    return null;
  }
});

async function scanDirectory(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir);
  const musicFiles: string[] = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      musicFiles.push(...await scanDirectory(filePath));
    } else if (file.endsWith('.mp3') || file.endsWith('.flac')) {
      musicFiles.push(filePath);
    }
  }

  return musicFiles;
}

async function importSongs(files: string[]): Promise<any[]> {
  const importedSongs: any[] = [];

  for (const file of files) {
    try {
      const metadata = await mm.parseFile(file);
      const { common, format } = metadata;

      const artist = common.artist || 'Unknown Artist';
      const album = common.album || 'Unknown Album';
      const label = common.label? common.label[0] : 'Unknown Label';
    
      const song = await prisma.song.upsert({
        where: {
          title_artist_album: {
            title: common.title || path.basename(file, path.extname(file)),
            artist: artist,
            album: album,
          }
        },
        update: {},
        create: {
          title: common.title || path.basename(file, path.extname(file)),
          artist: artist,
          album: album,
          trackNumber: common.track.no || null,
          trackTotal: common.track.of || null,
          diskNumber: common.disk.no || null,
          diskTotal: common.disk.of || null,
          year: common.year ? common.year : null,
          genre: common.genre ? common.genre[0] : null,
          duration: format.duration || 0,
          bitrate: format.bitrate || 0,
          sampleRate: format.sampleRate || 0,
          label: label,
          filePath: file,
          numberOfChannels: format.numberOfChannels || 0,
          lossless: format.lossless || false,
          comment: common.comment ? common.comment[0] : null,
          bpm: common.bpm ? common.bpm : null,
          key: common.key || null,
        },
      });

      importedSongs.push(song);
    } catch (error) {
      console.error(`Error importing file ${file}:`, error);
    }
  }

  return importedSongs;
}