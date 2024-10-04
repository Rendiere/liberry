import { defineStore } from 'pinia';

interface Song {
  id: number
  title: string
  artist: {
    name: string
  }
  album: {
    title: string
  } | null
  duration: number
  year: number
  filePath: string
}

export const useNowPlayingStore = defineStore('nowPlaying', {
  state: () => ({
    currentSong: null as Song | null,
    currentTime: 0,
    playlist: [] as Song[],
    currentIndex: -1,
  }),
  actions: {
    setCurrentSong(song: Song) {
      console.log('setCurrentSong called with:', song)
      this.currentSong = song
      this.currentIndex = this.playlist.findIndex(s => s.id === song.id)
    },
    setCurrentTime(time: number) {
      this.currentTime = time
    },
    setPlaylist(songs: Song[]) {
      this.playlist = songs
    },
    nextTrack() {
      if (this.currentIndex < this.playlist.length - 1) {
        this.currentIndex++
        this.currentSong = this.playlist[this.currentIndex]
      }
    },
    previousTrack() {
      if (this.currentIndex > 0) {
        this.currentIndex--
        this.currentSong = this.playlist[this.currentIndex]
      }
    },
  },
  getters: {
    progress(): number {
      if (!this.currentSong) return 0
      return (this.currentTime / this.currentSong.duration) * 100
    },
  },
});
