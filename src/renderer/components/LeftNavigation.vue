<template>
    <n-layout-sider-content>
      <n-button @click="importMusic" style="margin-bottom: 16px;">Import Music</n-button>
      <n-input-group>
        <n-input placeholder="Search" />
        <n-button type="primary">
          <template #icon>
            <n-icon><search-icon /></n-icon>
          </template>
        </n-button>
      </n-input-group>
      <n-menu :options="menuOptions" />
    </n-layout-sider-content>
  </template>
  
  <script setup lang="ts">
  import { h } from 'vue'
  import { NMenu, NInput, NInputGroup, NButton, NIcon, NLayoutContent } from 'naive-ui'
  import { SearchOutline as SearchIcon, MusicalNoteOutline as SongIcon, PersonOutline as ArtistIcon } from '@vicons/ionicons5'
  
  const menuOptions = [
    {
      label: 'Library',
      key: 'library',
      children: [
        {
          label: () =>
            h(
              'div',
              {
                style: 'display: flex; align-items: center;'
              },
              [
                h(NIcon, null, { default: () => h(SongIcon) }),
                h('span', { style: 'margin-left: 8px;' }, 'Songs')
              ]
            ),
          key: 'songs'
        },
        {
          label: () =>
            h(
              'div',
              {
                style: 'display: flex; align-items: center;'
              },
              [
                h(NIcon, null, { default: () => h(SongIcon) }),
                h('span', { style: 'margin-left: 8px;' }, 'Albums')
              ]
            ),
          key: 'albums'
        },
        {
          label: () =>
            h(
              'div',
              {
                style: 'display: flex; align-items: center;'
              },
              [
                h(NIcon, null, { default: () => h(ArtistIcon) }),
                h('span', { style: 'margin-left: 8px;' }, 'Artists')
              ]
            ),
          key: 'artists'
        }
      ]
    }
  ]
  
  const importMusic = async () => {
    const result = await window.api.importMusic()
    if (result.success) {
      // You can add a notification or update the UI here
      console.log('Music imported successfully')
    } else {
      console.error('Failed to import music:', result.error)
    }
  }
  </script>
  
  <style scoped>
  .left-navigation {
    padding: 16px;
  }
  </style>