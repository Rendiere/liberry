"use strict";
const electron = require("electron");
const path = require("path");
const fs = require("fs/promises");
const mm = require("music-metadata");
const url = require("url");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const mm__namespace = /* @__PURE__ */ _interopNamespaceDefault(mm);
function createWindow() {
  const win = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../index.html"));
  }
  electron.ipcMain.handle("dialog:openDirectory", async () => {
    const result = await electron.dialog.showOpenDialog({ properties: ["openDirectory"] });
    return result.filePaths;
  });
  electron.ipcMain.handle("scanDirectory", scanDirectory);
  electron.ipcMain.handle("playAudio", (event, filePath) => {
    const safeFilePath = path.normalize(filePath).replace(/\\/g, "/");
    return `safe-file://${safeFilePath}`;
  });
  electron.ipcMain.handle("updateMetadata", async (event, updatedFile) => {
    try {
      console.log("Updating metadata:", updatedFile);
      return true;
    } catch (error) {
      console.error("Error updating metadata:", error);
      return false;
    }
  });
}
electron.app.whenReady().then(() => {
  electron.protocol.registerFileProtocol("safe-file", (request, callback) => {
    const filePath = url.fileURLToPath("file://" + request.url.slice("safe-file://".length));
    callback(filePath);
  });
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
async function scanDirectory(event, directoryPath) {
  const files = await fs.readdir(directoryPath);
  const musicFiles = [];
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      musicFiles.push(...await scanDirectory(event, filePath));
    } else if (stats.isFile() && isMusicFile(file)) {
      const metadata = await extractMetadata(filePath);
      musicFiles.push({ path: filePath, metadata });
    }
  }
  return musicFiles;
}
function isMusicFile(filename) {
  const musicExtensions = [".mp3", ".flac", ".wav", ".ogg", ".m4a"];
  return musicExtensions.includes(path.extname(filename).toLowerCase());
}
async function extractMetadata(filePath) {
  try {
    const metadata = await parseFile(filePath);
    return {
      title: metadata.common.title,
      artist: metadata.common.artist,
      album: metadata.common.album,
      year: metadata.common.year,
      genre: metadata.common.genre,
      duration: metadata.format.duration
    };
  } catch (error) {
    console.error(`Error extracting metadata from ${filePath}:`, error);
    return {};
  }
}
electron.ipcMain.handle("scan:directory", async (_, dirPath) => {
  try {
    const musicFiles = await scanDirectoryForMusicFiles(dirPath);
    return musicFiles;
  } catch (error) {
    console.error("Error scanning directory:", error);
    throw error;
  }
});
async function scanDirectoryForMusicFiles(dirPath) {
  const files = await fs.readdir(dirPath);
  const musicFiles = [];
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      musicFiles.push(...await scanDirectoryForMusicFiles(filePath));
    } else if (path.extname(file).toLowerCase() === ".mp3") {
      try {
        const metadata = await mm__namespace.parseFile(filePath);
        musicFiles.push({
          path: filePath,
          metadata: {
            title: metadata.common.title || path.basename(filePath),
            artist: metadata.common.artist || "Unknown Artist",
            album: metadata.common.album || "Unknown Album",
            year: metadata.common.year,
            genre: metadata.common.genre
          }
        });
      } catch (error) {
        console.error(`Error parsing metadata for ${filePath}:`, error);
      }
    }
  }
  return musicFiles;
}
