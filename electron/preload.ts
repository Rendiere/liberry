import { contextBridge, ipcRenderer } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electron', {
  invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args)
})
