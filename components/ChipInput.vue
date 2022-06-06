<script setup>
  import { ref, reactive, computed } from 'vue'
  import ChipInputArea from '@/components/ChipInputArea.vue'
  import ChipList from '@/components/ChipList.vue'
  import { generateRandomColor } from '@/helpers/colors.js'

  const props = defineProps({
    autocomplete: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxChips: {
      type: Number,
      default: -1
    }
  })

  const emit = defineEmits(['delete-chip'])

  const state = reactive({
      chips: [],
      color: '#fff',
      userInput: ''
  })

  const input = ref(null)

  const isWarning = computed(() => {
    return props.maxChips > 0 && state.chips.length >= props.maxChips && state.userInput.length > 0
  })

  function onSubmit(value) {
    // Don't add the chip if max was reached
    if (props.maxChips > 0 && state.chips.length >= props.maxChips) return 

    // Add the chip
    state.chips.push({value, color: state.color})

    // Prepare next chip
    state.color = generateRandomColor()
    clear()
  }

  function clearAll() {
    state.chips = []
  }

  function onDeleteChip(index) {
    state.chips.splice(index, 1)
    emit('delete-chip')
  }

  const focus = () => input.value.focus()
  const clear = () => input.value.clear()

  defineExpose({
    focus, clear, 
    getChips: () => state.chips,
    clearChips: clearAll
  })
</script>

<template>
  <form
  :class="['bg-stone-800 px-2 py-2 flex flex-wrap items-center rounded',
  { 'outline outline-2 outline-red-500': isWarning }]"
  @submit.prevent>
    <label for="chips-input" class="sr-only">Input your tags</label>
    <ChipInputArea
    ref="input"
    id="chips-input"
    class="order-2 grow basis-0"
    @submit="onSubmit" 
    :color="state.color"  
    :placeholder="props.placeholder" 
    :autocomplete="props.autocomplete" 
    v-model="state.userInput"
    />
    <ChipList :chips="state.chips" ref="chipList" @delete="onDeleteChip"/>
  </form>
</template>