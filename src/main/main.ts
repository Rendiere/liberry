import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import prisma from './utils/prisma'; // Import Prisma Client

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

// Fetch all songs with related artist and album data
ipcMain.handle('get-songs', async () => {
  try {
    const songs = await prisma.song.findMany({
      include: {
        artist: {
          select: {
            name: true,
          },
        },
        album: {
          select: {
            title: true,
          },
        },
      },
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