<template>
    <div class="left-navigation">
      <n-input-group>
        <n-input placeholder="Search" />
        <n-button type="primary">
          <template #icon>
            <n-icon><search-icon /></n-icon>
          </template>
        </n-button>
      </n-input-group>
      <n-menu :options="menuOptions" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { h } from 'vue'
  import { NMenu, NInput, NInputGroup, NButton, NIcon } from 'naive-ui'
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
  </script>
  
  <style scoped>
  .left-navigation {
    padding: 16px;
  }
  </style>