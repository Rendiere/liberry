export {};

declare global {
  interface Window {
    api: {
      getSongs: () => Promise<{ success: boolean; data?: any; error?: string }>;
      addSong: (songData: any) => Promise<{ success: boolean; data?: any; error?: string }>;
      // Add more methods as needed
    };
  }
}
