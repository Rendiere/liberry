<template>
  <div class="now-playing">
    <div class="controls">
      <n-button circle @click="previousTrack">
        <template #icon><n-icon><previous-icon /></n-icon></template>
      </n-button>
      <n-button circle @click="playPause">
        <template #icon><n-icon><play-icon v-if="!isPlaying" /><pause-icon v-else /></n-icon></template>
      </n-button>
      <n-button circle @click="nextTrack">
        <template #icon><n-icon><next-icon /></n-icon></template>
      </n-button>
    </div>
    <div class="song-info">
      <h3>{{ currentSong ? currentSong.title : 'No song playing' }}</h3>
      <p>{{ currentSong ? `${currentSong.artist.name} - ${currentSong.album?.title}` : 'Unknown Artist - Unknown Album' }}</p>
    </div>
    <div class="volume">
      <n-slider v-model:value="volume" :min="0" :max="100" @update:value="updateVolume" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { NButton, NIcon, NSlider } from 'naive-ui'
import { useNowPlayingStore } from '../stores/nowPlaying'
import { storeToRefs } from 'pinia'
import { PlayOutline as PlayIcon, PauseOutline as PauseIcon, PlaySkipBackOutline as PreviousIcon, PlaySkipForwardOutline as NextIcon } from '@vicons/ionicons5'
import { Howl } from 'howler'

const nowPlayingStore = useNowPlayingStore()
const { currentSong } = storeToRefs(nowPlayingStore)

const isPlaying = ref(false)
const volume = ref(50)
let sound: Howl | null = null

const playPause = () => {
  console.log('playPause called')
  if (!sound || !currentSong.value) return

  if (isPlaying.value) {
    sound.pause()
  } else {
    sound.play()
  }
  isPlaying.value = !isPlaying.value
}

const stop = () => {
  if (!sound) return
  sound.stop()
  isPlaying.value = false
}

const onEnded = () => {
  isPlaying.value = false
  nextTrack()
}

const previousTrack = () => {
  nowPlayingStore.previousTrack()
}

const nextTrack = () => {
  nowPlayingStore.nextTrack()
}

const updateVolume = (newVolume: number) => {
  if (sound) {
    sound.volume(newVolume / 100)
  }
}

const setupHowl = async (filePath: string) => {
  console.log('Setting up Howl with src:', filePath)
  if (sound) {
    sound.unload()
  }

  try {
    const audioData = await window.api.loadAudioFile(filePath);
    if (!audioData) {
      console.error('Failed to load audio file');
      return;
    }

    sound = new Howl({
      src: [`data:audio/mp3;base64,${audioData}`],
      html5: true,
      volume: volume.value / 100,
      onend: onEnded,
      onplay: () => {
        console.log('Howl onplay event')
        isPlaying.value = true
      },
      onpause: () => {
        console.log('Howl onpause event')
        isPlaying.value = false
      },
      onstop: () => {
        console.log('Howl onstop event')
        isPlaying.value = false
      },
    })

    sound.play()
  } catch (error) {
    console.error('Error setting up Howl:', error)
  }
}

watch(currentSong, (newSong) => {
  console.log('currentSong changed:', newSong)
  if (newSong) {
    setupHowl(newSong.filePath)
  } else {
    stop()
  }
})

onMounted(() => {
  console.log('NowPlaying component mounted')
  if (currentSong.value) {
    setupHowl(`${currentSong.value.filePath}`)
  }
})

onUnmounted(() => {
  if (sound) {
    sound.unload()
  }
})
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
