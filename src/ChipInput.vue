<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import InputArea from '@/components/InputArea.vue'
  import ChipItem from '@/components/ChipItem.vue'

  const input = ref(null)

  const max_chips = 5

  const state = reactive({ chips: [], color: '#fff', typing_chip: '' })

  function handleSubmit(value) {
    // Don't add the chip if max was reached
    if (state.chips.length >= max_chips) return 

    state.chips.push({value, color: state.color})
    state.color = generateRandomColor()
    input.value.clear()
    state.typing_chip = ''
  }

  onMounted(() => {
    input.value.focus()
  })

  function handleTyping(value) {
    state.typing_chip = value
  }

  function generateRandomColor() {
    const randomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const h = randomInt(0, 360)
    const s = randomInt(42, 98)
    const l = randomInt(40, 90)
    
    return `hsl(${h},${s}%,${l}%)`
  }
</script>

<template>
  <div class="flex flex-col gap-2 mx-8">
    <input-area class="grow" @submit="handleSubmit" @typing="handleTyping" :style="{ color: state.color, caretColor: state.color }" :is_warning="state.chips.length >= max_chips && state.typing_chip !== ''" ref="input"/>
    <ul class="flex flex-wrap gap-1">
      <li v-for="(chip, index) in state.chips">
        <chip-item :text="chip.value" :color="chip.color" :key="chip.value" @close="state.chips.splice(index, 1)"/>
      </li>
      <li>
        <chip-item class="opacity-50" :text="state.typing_chip" :color="state.color" :key="state.typing_chip" :show_close="false"/>
      </li>
    </ul>
    <small :class="state.chips.length >= max_chips * 0.8 ? 'text-red-500' : 'text-stone-50'">max: {{ state.chips.length }}/{{ max_chips }}</small>
  </div>
</template>