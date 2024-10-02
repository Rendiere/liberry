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