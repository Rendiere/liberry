import {contextBridge, ipcRenderer} from 'electron';
import { Track } from '../shared/types';


contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message: string) => ipcRenderer.send('message', message),
  openDialog: () => ipcRenderer.invoke('open-dialog'),
  scanDirectory: (path: string) => ipcRenderer.invoke('scan-directory', path) as Promise<Track[]>
})
