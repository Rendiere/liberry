<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Music Collector App</h1>
    <button @click="scanLocalFiles" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Scan Local Files
    </button>
    <div v-if="musicFiles.length > 0" class="mt-4">
      <h2 class="text-xl font-semibold mb-2">Scanned Files:</h2>
      <ul>
        <li v-for="file in musicFiles" :key="file.path" class="mb-2">
          {{ file.metadata.title || file.path }} - {{ file.metadata.artist }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { scanDirectory } from '../services/localLibrary'

export default defineComponent({
  name: 'App',
  setup() {
    const musicFiles = ref([])

    const scanLocalFiles = async () => {
      try {
        const files = await window.electron.invoke('dialog:openDirectory')
        if (files) {
          musicFiles.value = await scanDirectory(files[0])
        }
      } catch (error) {
        console.error('Error scanning local files:', error)
      }
    }

    return {
      musicFiles,
      scanLocalFiles
    }
  }
})
</script>