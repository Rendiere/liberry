import { contextBridge, ipcRenderer } from 'electron';

// Define the API exposed to the renderer
contextBridge.exposeInMainWorld('api', {
  getSongs: async () => {
    const response = await ipcRenderer.invoke('get-songs');
    return response;
  },
  addSong: async (songData: any) => {
    const response = await ipcRenderer.invoke('add-song', songData);
    return response;
  },
  importMusic: async () => {
    const response = await ipcRenderer.invoke('import-music');
    return response;
  },
  // Add more methods as needed
});