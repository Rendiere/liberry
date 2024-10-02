<template>
  <div class="mt-4">
    <h2 class="text-xl font-semibold mb-2">Edit Metadata:</h2>
    <form @submit.prevent="saveMetadata">
      <div v-for="field in metadataFields" :key="field" class="mb-2">
        <label :for="field" class="block">{{ capitalizeFirstLetter(field) }}:</label>
        <input
          v-if="field !== 'genre'"
          :id="field"
          v-model="editedMetadata[field]"
          :type="field === 'year' ? 'number' : 'text'"
          class="w-full p-2 border rounded"
        >
        <input
          v-else
          :id="field"
          v-model="genreInput"
          type="text"
          class="w-full p-2 border rounded"
        >
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { MusicFile } from '../types'

export default defineComponent({
  name: 'MetadataEditor',
  props: {
    file: {
      type: Object as PropType<MusicFile>,
      required: true,
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const editedMetadata = ref({ ...props.file.metadata })
    const metadataFields = ['title', 'artist', 'album', 'year', 'genre']

    const genreInput = computed({
      get: () => editedMetadata.value.genre?.join(', ') || '',
      set: (value: string) => {
        editedMetadata.value.genre = value.split(',').map(g => g.trim()).filter(g => g)
      }
    })

    const saveMetadata = () => {
      const updatedFile: MusicFile = {
        ...props.file,
        metadata: editedMetadata.value,
      }
      emit('update', updatedFile)
    }

    const capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return {
      editedMetadata,
      metadataFields,
      genreInput,
      saveMetadata,
      capitalizeFirstLetter,
    }
  },
})
</script>