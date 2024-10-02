import { app, BrowserWindow, ipcMain, dialog, protocol } from 'electron'
import path from 'path'
import fs from 'fs/promises'  // Import the promises version of fs
import * as mm from 'music-metadata'
import { fileURLToPath } from 'url'
import { MusicFile } from '../src/types'  // Make sure this path is correct

interface MusicFile {
  path: string;
  metadata: {
    title?: string;
    artist?: string;
    album?: string;
    year?: number;
    genre?: string[];
    duration?: number;
  };
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, '../index.html'))
  }

  // Handle the dialog:openDirectory event
  ipcMain.handle('dialog:openDirectory', async () => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
    return result.filePaths
  })

  // Handle the scanDirectory event
  ipcMain.handle('scanDirectory', scanDirectory)

  // Update the playAudio handler
  ipcMain.handle('playAudio', (event, filePath) => {
    const safeFilePath = path.normalize(filePath).replace(/\\/g, '/')
    return `safe-file://${safeFilePath}`
  })

  // Handle the updateMetadata event
  ipcMain.handle('updateMetadata', async (event, updatedFile: MusicFile) => {
    try {
      // Note: music-metadata doesn't have a writeMetadata function
      // You'll need to use a different library or implement your own metadata writing function
      // For now, we'll just log the update and return true
      console.log('Updating metadata:', updatedFile)
      return true
    } catch (error) {
      console.error('Error updating metadata:', error)
      return false
    }
  })
}

app.whenReady().then(() => {
  protocol.registerFileProtocol('safe-file', (request, callback) => {
    const filePath = fileURLToPath('file://' + request.url.slice('safe-file://'.length))
    callback(filePath)
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

async function scanDirectory(event: Electron.IpcMainInvokeEvent, directoryPath: string): Promise<MusicFile[]> {
  const files = await fs.readdir(directoryPath)
  const musicFiles: MusicFile[] = []

  for (const file of files) {
    const filePath = path.join(directoryPath, file)
    const stats = await fs.stat(filePath)

    if (stats.isDirectory()) {
      musicFiles.push(...await scanDirectory(event, filePath))
    } else if (stats.isFile() && isMusicFile(file)) {
      const metadata = await extractMetadata(filePath)
      musicFiles.push({ path: filePath, metadata })
    }
  }

  return musicFiles
}

function isMusicFile(filename: string): boolean {
  const musicExtensions = ['.mp3', '.flac', '.wav', '.ogg', '.m4a']
  return musicExtensions.includes(path.extname(filename).toLowerCase())
}

async function extractMetadata(filePath: string): Promise<MusicFile['metadata']> {
  try {
    const metadata = await parseFile(filePath)
    return {
      title: metadata.common.title,
      artist: metadata.common.artist,
      album: metadata.common.album,
      year: metadata.common.year,
      genre: metadata.common.genre,
      duration: metadata.format.duration
    }
  } catch (error) {
    console.error(`Error extracting metadata from ${filePath}:`, error)
    return {}
  }
}

ipcMain.handle('scan:directory', async (_, dirPath: string) => {
  try {
    const musicFiles = await scanDirectoryForMusicFiles(dirPath)
    return musicFiles
  } catch (error) {
    console.error('Error scanning directory:', error)
    throw error  // Re-throw the error so it's passed back to the renderer process
  }
})

// Update the scanDirectoryForMusicFiles function
async function scanDirectoryForMusicFiles(dirPath: string): Promise<MusicFile[]> {
  const files = await fs.readdir(dirPath)
  const musicFiles: MusicFile[] = []

  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const stats = await fs.stat(filePath)

    if (stats.isDirectory()) {
      musicFiles.push(...await scanDirectoryForMusicFiles(filePath))
    } else if (path.extname(file).toLowerCase() === '.mp3') {
      try {
        const metadata = await mm.parseFile(filePath)
        musicFiles.push({
          path: filePath,
          metadata: {
            title: metadata.common.title || path.basename(filePath),
            artist: metadata.common.artist || 'Unknown Artist',
            album: metadata.common.album || 'Unknown Album',
            year: metadata.common.year,
            genre: metadata.common.genre,
          }
        })
      } catch (error) {
        console.error(`Error parsing metadata for ${filePath}:`, error)
      }
    }
  }

  return musicFiles
}
