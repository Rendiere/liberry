export interface MusicFile {
  path: string;
  metadata: {
    title: string;
    artist: string;
    album: string;
    year?: number;
    genre?: string[];
  };
}

export interface ElectronAPI {
  invoke: (channel: string, ...args: any[]) => Promise<any>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}