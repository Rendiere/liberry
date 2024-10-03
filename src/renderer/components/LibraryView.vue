<template>
  <div class="library-view">
    <n-data-table
      :columns="columns"
      :data="songs"
      :pagination="pagination"
      :bordered="false"
      :striped="true"
      :size="'medium'"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NDataTable } from 'naive-ui'

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

const songs = ref<Song[]>([])
const loading = ref(true)

const columns = [
  {
    title: 'Title',
    key: 'title',
  },
  {
    title: 'Artist',
    key: 'artist',
    render: (row: Song) => row.artist.name,
  },
  {
    title: 'Album',
    key: 'album',
    render: (row: Song) => (row.album ? row.album.title : 'N/A'),
  },
  {
    title: 'Time',
    key: 'duration',
    render: (row: Song) => formatDuration(row.duration),
  },
  {
    title: 'Year',
    key: 'year',
  },
]

const pagination = {
  pageSize: 10,
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

async function fetchSongs() {
  loading.value = true
  try {
    const response = await window.api.getSongs()
    if (response.success && response.data) {
      songs.value = response.data
    } else {
      console.error('Failed to fetch songs:', response.error)
    }
  } catch (error) {
    console.error('Error fetching songs:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSongs()
})
</script>

<style scoped>
.library-view {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>