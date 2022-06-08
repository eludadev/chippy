<script setup>
  import { ref, computed, onMounted } from 'vue'
  import ChipInput from '@/components/ChipInput.vue'

  const config = reactive({
    label: 'Tags',
    autocomplete: ['codepen', 'css', 'html', 'AcrobaticRemove', 'javascript', 'vue', 'webdev', 'beginners', 'open-source', 'opensource', 'vuejs', 'npm'],
    placeholder: 'codepen',
    maxChips: 7
  })

  // Document SEO meta-tags.
  useHead({
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Chippy',
    meta: [
      { name: 'description', content: 'Add this chip input component to your website, at no cost.' },
      { name: 'og:image', content: '/cover.png' },
      { name: 'twitter:image', content: '/cover.png' }
    ],
    link: [
      { rel: 'icon', content: '/favicon.ico' }
    ]
  })

  const input = ref(null)

  onMounted(() => {    
    focusInput()
  })

  const chipsCount = computed(() => {
    return input.value && input.value.getChips().length
  })

  function clearAll() {
    clearChips()
    focusInput()
  }

  function onDeleteChip() {
    focusInput()
  }

  const focusInput = () => input.value.focus()
  const clearInput = () => input.value.clear()
  const clearChips = () => input.value.clearChips()
</script>

<template>
  <main class="mx-2">
    <ChipInput 
    ref="input"
    @delete:chip="onDeleteChip"
    :autocomplete="config.autocomplete"
    :label="config.label"
    :placeholder="config.placeholder"
    :max-chips="config.maxChips"
    />
    
    <div class="mt-1 space-x-1">
      <small :class="chipsCount === config.maxChips ? 'text-red-500' : chipsCount >= config.maxChips * 0.8 ? 'text-yellow-500' : 'text-stone-50'">max: {{ chipsCount }}/{{ config.maxChips }}</small>
      <button class="underline text-stone-50 text-sm" title="Clear all" @click="clearAll">clear</button>
    </div>
  </main>
</template>