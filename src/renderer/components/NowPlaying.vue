<template>
  <div class="now-playing">
    <div class="controls">
      <n-button circle @click="previousTrack">
        <template #icon><n-icon><previous-icon /></n-icon></template>
      </n-button>
      <n-button circle @click="togglePlay">
        <template #icon><n-icon><play-icon v-if="!isPlaying" /><pause-icon v-else /></n-icon></template>
      </n-button>
      <n-button circle @click="nextTrack">
        <template #icon><n-icon><next-icon /></n-icon></template>
      </n-button>
    </div>
    <div class="song-info">
      <h3>{{ currentSong.title }}</h3>
      <p>{{ currentSong.artist }} - {{ currentSong.album }}</p>
    </div>
    <div class="volume">
      <n-slider v-model:value="volume" :min="0" :max="100" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NIcon, NSlider } from 'naive-ui'
import { PlayOutline as PlayIcon, PauseOutline as PauseIcon, PlaySkipBackOutline as PreviousIcon, PlaySkipForwardOutline as NextIcon } from '@vicons/ionicons5'

const isPlaying = ref(false)
const volume = ref(50)
const currentSong = ref({
  title: 'No song playing',
  artist: 'Unknown Artist',
  album: 'Unknown Album'
})

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

const previousTrack = () => {
  // Implement previous track logic
}

const nextTrack = () => {
  // Implement next track logic
}
</script>

<style scoped>
.now-playing {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 100%;
}

.controls {
  display: flex;
  gap: 8px;
}

.song-info {
  text-align: center;
}

.song-info h3 {
  margin: 0;
}

.song-info p {
  margin: 0;
  font-size: 0.9em;
  color: #888;
}

.volume {
  width: 100px;
}
</style>
