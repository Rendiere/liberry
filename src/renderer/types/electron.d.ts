export {};

declare global {
  interface Window {
    api: {
      getSongs: () => Promise<{ success: boolean; data?: any; error?: string }>;
      addSong: (songData: any) => Promise<{ success: boolean; data?: any; error?: string }>;
      importMusic: () => Promise<{ success: boolean; data?: any; error?: string }>;
      loadAudioFile: (filePath: string) => Promise<{ success: boolean; data?: any; error?: string }>;
      // Add more methods as needed
    };
  }
}
