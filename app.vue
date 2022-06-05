<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import InputArea from '@/components/InputArea.vue'
  import ChipList from '@/components/ChipList.vue'
  import { generateRandomColor } from '@/helpers/colors.js'

  const config = reactive({
      autocomplete: ['codepen', 'css', 'html', 'AcrobaticRemove'],
      placeholder: 'codepen',
      maxChips: 10
  })

  const state = reactive({
      chips: [],
      color: '#fff',
      userInput: ''
  })

  const input = ref(null)

  // Document SEO meta-tags.
  useHead({
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

  onMounted(() => {    
    focusInput()
  })

  function handleSubmit(value) {
    // Don't add the chip if max was reached
    if (state.chips.length >= config.maxChips) return 

    // Add the chip
    state.chips.push({value, color: state.color})

    // Prepare next chip
    state.color = generateRandomColor()
    clearInput()
  }

  function clearAll() {
    state.chips = []
    focusInput()
  }

  function onDeleteChip(index) {
    state.chips.splice(index, 1)
    focusInput()
  }


  const focusInput = () => input.value.focus()
  const clearInput = () => input.value.clear()
</script>

<template>
  <div class="flex flex-col gap-2 mx-8">
    <InputArea 
    ref="input"
    @submit="handleSubmit" 
    :color="state.color" 
    :is-warning="state.chips.length >= config.maxChips && state.userInput.length > 0" 
    :placeholder="config.placeholder" 
    :autocomplete="config.autocomplete" 
    v-model="state.userInput"
    />
    <ChipList :chips="state.chips" ref="chipList" @delete="onDeleteChip"/>
    <div class="flex gap-1 items-center">
      <small :class="state.chips.length === config.maxChips ? 'text-red-500' : state.chips.length >= config.maxChips * 0.8 ? 'text-yellow-500' : 'text-stone-50'">max: {{ state.chips.length }}/{{ config.maxChips }}</small>
      <button class="underline text-stone-50 text-sm" title="Clear all" @click="clearAll">clear</button>
    </div>
  </div>
</template>