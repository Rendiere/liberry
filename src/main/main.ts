import {app, BrowserWindow, ipcMain, session, dialog} from 'electron';
import {join} from 'path';
import * as fs from 'fs';
import * as path from 'path';
import * as mm from 'music-metadata';
import { Track } from '../shared/types';



function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    }
  });

  console.log("here");

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  }
  else {
    console.log(join(app.getAppPath(), 'renderer', 'index.html'));
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('message', (event, message) => {
  console.log(message);
});

ipcMain.handle('open-dialog', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (result.canceled) {
    return undefined;
  } else {
    return result.filePaths[0];
  }
});

ipcMain.handle('scan-directory', async (event, directoryPath) => {
  async function scanDirectory(dir: string): Promise<Track[]> {
    let results: Track[] = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      console.log(`Scanning file: ${filePath}`);
      
      if (stat.isDirectory()) {
        results = results.concat(await scanDirectory(filePath));
      } else {
        const ext = path.extname(file).toLowerCase();
        if (['.mp3', '.wav', '.flac', '.aac', '.ogg'].includes(ext)) {
          try {
            const metadata = await mm.parseFile(filePath);
            console.log(`Metadata for ${filePath}:`, metadata);
            results.push({
              title: metadata.common.title || 'Unknown Title',
              artist: metadata.common.artist || 'Unknown Artist',
              album: metadata.common.album || 'Unknown Album',
              genre: metadata.common.genre ? metadata.common.genre[0] : 'Unknown Genre',
              year: metadata.common.year ? metadata.common.year.toString() : 'Unknown Year',
              label: metadata.common.label ? metadata.common.label[0] : 'Unknown Label',
              filepath: filePath
            });
          } catch (error) {
            console.error(`Error reading metadata for ${filePath}:`, error);
          }
        }
      }
    }
    
    return results;
  }

  try {
    const tracks = await scanDirectory(directoryPath);
    return tracks;
  } catch (error) {
    console.error('Error scanning directory:', error);
    throw error;
  }
});