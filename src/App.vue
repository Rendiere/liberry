<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Music Library</h1>
    <FileScanner @files-scanned="updateMusicFiles" />
    <p>Total files: {{ musicFiles.length }}</p>
    <MusicList 
      v-if="musicFiles.length > 0" 
      :music-files="sortedMusicFiles" 
      :current-playing="currentPlaying" 
      @play-track="playTrack" 
    />
    <p v-else>No music files scanned yet.</p>
    <MetadataEditor v-if="selectedFile" :file="selectedFile" @update="updateMetadata" />
    <audio ref="audioPlayer" @ended="handleAudioEnded"></audio>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import FileScanner from './components/FileScanner.vue'
import MusicList from './components/MusicList.vue'
import MetadataEditor from './components/MetadataEditor.vue'
import { MusicFile } from './types'

export default defineComponent({
  name: 'App',
  components: {
    FileScanner,
    MusicList,
    MetadataEditor,
  },
  setup() {
    const musicFiles = ref<MusicFile[]>([])
    const selectedFile = ref<MusicFile | null>(null)
    const currentPlaying = ref<MusicFile | null>(null)
    const sortBy = ref<keyof MusicFile['metadata']>('title')
    const audioPlayer = ref<HTMLAudioElement | null>(null)

    const sortedMusicFiles = computed(() => {
      return [...musicFiles.value].sort((a, b) => {
        const aValue = a.metadata[sortBy.value] || ''
        const bValue = b.metadata[sortBy.value] || ''
        return String(aValue).localeCompare(String(bValue))
      })
    })

    const updateMusicFiles = (files: MusicFile[]) => {
      musicFiles.value = files
    }

    const updateMetadata = (updatedFile: MusicFile) => {
      const index = musicFiles.value.findIndex(file => file.path === updatedFile.path)
      if (index !== -1) {
        const newMusicFiles = [...musicFiles.value]
        newMusicFiles[index] = updatedFile
        musicFiles.value = newMusicFiles
      }
    }

    const playTrack = async (file: MusicFile) => {
      if (currentPlaying.value === file && audioPlayer.value?.paused === false) {
        audioPlayer.value.pause()
        currentPlaying.value = null
      } else {
        if (audioPlayer.value) {
          audioPlayer.value.pause()
        }
        const safeFilePath = await window.electron.invoke('playAudio', file.path)
        audioPlayer.value!.src = safeFilePath
        audioPlayer.value!.play()
        currentPlaying.value = file
      }
    }

    const handleAudioEnded = () => {
      currentPlaying.value = null
    }

    watch(musicFiles, (newFiles) => {
      console.log('musicFiles changed, new length:', newFiles.length)
    })

    return {
      musicFiles,
      sortedMusicFiles,
      selectedFile,
      currentPlaying,
      audioPlayer,
      updateMusicFiles,
      updateMetadata,
      playTrack,
      handleAudioEnded,
    }
  },
})
</script>