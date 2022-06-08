<script setup>
  import { ref, reactive, computed } from 'vue'
  import ChipInputArea from '@/components/ChipInputArea.vue'
  import ChipList from '@/components/ChipInputList.vue'
  import { generateRandomColor } from '@/helpers/colors.js'

  const props = defineProps({
    autocomplete: {
      type: Array,
      default: []
    },
    label: {
      type: String,
      default: ''
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

  const emit = defineEmits(['delete:chip'])

  const state = reactive({
      chips: [],
      color: '#fff',
      userInput: ''
  })

  const input = ref(null)
  const chipList = ref(null)

  const isWarning = computed(() => {
    return props.maxChips > 0 && state.chips.length >= props.maxChips && state.userInput.length > 0
  })

  const isOverflow = computed(() => {
    return input.value && input.value.getIsOverflow()
  })

  function onSubmit(value) {
    // Don't add the chip if max was reached
    if (props.maxChips > 0 && state.chips.length >= props.maxChips) return 

    // Add the chip
    state.chips.unshift({value, color: state.color})

    // Prepare next chip
    state.color = generateRandomColor()
    clear()
  }

  function onDeleteChip(index) {
    state.chips.splice(index, 1)
    emit('delete:chip')
  }

  function onLastBackspace() {
    chipList.value.focusLast() // Focus on last chip
    emit('delete:chip')
  }

  function clearAll() {
    state.chips = []
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
  class="bg-stone-800 px-2 py-2 rounded overflow-hidden"
  :class="{'warning': isWarning}"
  @submit.prevent>

    <label for="chips-input" v-if="props.label.length"
    class="text-stone-50 text-sm ml-2 mb-2 block">
      {{ props.label }}
    </label>

    <label for="chips-input" class="sr-only" v-else>Enter your tags:</label>

    <ChipList 
    :chips="state.chips" 
    :input-is-overflow="isOverflow" 
    ref="chipList" 
    @delete="onDeleteChip">
      <template #input>
        <ChipInputArea
        ref="input"
        id="chips-input"
        @submit="onSubmit"
        @last-backspace="onLastBackspace"
        :color="state.color"  
        :placeholder="props.placeholder" 
        :autocomplete="props.autocomplete" 
        v-model="state.userInput"
        />
      </template>
    </ChipList>

  </form>
</template>

<style scoped>
  .warning {
    @apply outline outline-2 outline-red-500;
  }
</style>