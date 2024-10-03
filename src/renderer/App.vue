<template>
  <n-layout style="height: 100vh;">
    <!-- Left Navigation Pane -->
    <n-layout-sider width="250" bordered>
      <LeftNavigation @navigate="handleNavigation" />
    </n-layout-sider>

    <!-- Main Content Area -->
    <n-layout position="absolute" style="top: 0; right: 0; bottom: 80px; left: 250px;">
      <n-layout-content content-style="padding: 24px;">
        <component :is="views[currentView]" />
      </n-layout-content>
    </n-layout>

    <!-- Now Playing Bar -->
    <n-layout-footer bordered position="absolute" style="height: 80px; left: 250px; bottom: 0; right: 0;">
      <NowPlaying />
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NLayout, NLayoutSider, NLayoutContent, NLayoutFooter } from 'naive-ui'
import LeftNavigation from './components/LeftNavigation.vue'
import NowPlaying from './components/NowPlaying.vue'
import LibraryView from './components/LibraryView.vue'

// Define available views
const views = {
  library: LibraryView,
  // Add more views here as needed
}

const currentView = ref<keyof typeof views>('library')

function handleNavigation(section: string) {
  if (section === 'songs') {
    currentView.value = 'library'
  }
  // Add more navigation logic here as needed
}
</script>

<style scoped>
/* No additional styles needed here */
</style>
