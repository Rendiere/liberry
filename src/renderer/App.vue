<script setup lang="ts">
import { ref } from 'vue';
import { Track } from '../shared/types';

const tracks = ref<Track[]>([]);

window.electronAPI.sendMessage('Hello from App.vue!');

async function openFolderDialog() {
  try {
    const result = await window.electronAPI.openDialog();
    if (result) {
      console.log('Selected folder:', result);
      await scanDirectory(result);
    } else {
      console.log('No folder selected');
    }
  } catch (error) {
    console.error('Error opening folder dialog:', error);
  }
}

async function scanDirectory(path: string) {
  try {
    const scannedTracks = await window.electronAPI.scanDirectory(path);
    tracks.value = scannedTracks;
    console.log('Scanned tracks:', scannedTracks);
    console.log('Tracks:', tracks.value);
  } catch (error) {
    console.error('Error scanning directory:', error);
  }
}
</script>

<template>
  <div>
    <h1>Music Library Scanner</h1>
    <button @click="openFolderDialog">Select Folder to Scan</button>
    <div v-if="tracks.length > 0">
      <h2>Found Tracks:</h2>
      <ul>
        <li v-for="track in tracks" :key="track.filepath">
          <strong>{{ track.title }}</strong> by {{ track.artist }}
          <br>
          Album: {{ track.album }} ({{ track.year }})
          <br>
          Genre: {{ track.genre }}, Label: {{ track.label }}
          <br>
          File: {{ track.filepath }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>
