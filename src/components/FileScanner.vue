<template>
  <div class="mb-4">
    <button @click="scanFiles" class="bg-blue-500 text-white px-4 py-2 rounded">
      Scan Files
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MusicFile } from '../types'

export default defineComponent({
  name: 'FileScanner',
  emits: ['files-scanned'],
  setup(_, { emit }) {
    const scanFiles = async () => {
      try {
        console.log('Scanning files...')
        const files = await window.electron.invoke('dialog:openDirectory')
        if (files) {
          console.log('Directory selected:', files[0])
          const scannedFiles = await window.electron.invoke('scan:directory', files[0])
          console.log('Scanned files:', scannedFiles.length)
          emit('files-scanned', scannedFiles)
        }
      } catch (error) {
        console.error('Error scanning local files:', error)
      }
    }

    return {
      scanFiles,
    }
  },
})
</script>