import { Track } from '../../shared/types';

/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  sendMessage: (message: string) => void
  openDialog: () => Promise<string | undefined>
  scanDirectory: (path: string) => Promise<Track[]>
}

declare global {
  interface Window {
    electronAPI: ElectronApi,
  }
}
