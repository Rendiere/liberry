<template>
  <div class="mb-4">
    <h2 class="text-xl font-semibold mb-2">Music Files:</h2>
    <ul>
      <li
        v-for="file in musicFiles"
        :key="file.path"
        class="mb-2 flex items-center"
      >
        <button
          @click="playTrack(file)"
          class="mr-2 bg-green-500 text-white px-2 py-1 rounded"
        >
          {{ file === currentPlaying ? 'Pause' : 'Play' }}
        </button>
        {{ file.metadata.title || file.path }} - {{ file.metadata.artist }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { MusicFile } from '../types'

export default defineComponent({
  name: 'MusicList',
  props: {
    musicFiles: {
      type: Array as PropType<MusicFile[]>,
      required: true,
    },
    currentPlaying: {
      type: Object as PropType<MusicFile | null>,
      default: null,
    },
  },
  emits: ['play-track'],
  setup(props, { emit }) {
    const playTrack = (file: MusicFile) => {
      emit('play-track', file)
    }

    return {
      playTrack,
    }
  },
})
</script>