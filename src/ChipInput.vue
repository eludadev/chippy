<script>
  import InputArea from '@/components/InputArea.vue'
  import ChipItem from '@/components/ChipItem.vue'

  export default {
    components: {
      InputArea,
      ChipItem
    },
    data() {
      return {
        autocomplete: ['codepen', 'css', 'html', 'AcrobaticRemove'],
        placeholder: 'codepen',
        maxChips: 10,

        chips: [],
        color: '#fff',
        typingChip: ''
      }
    },
    mounted() {
      this.$refs.input.focus()
    },
    methods: {
      handleSubmit(value) {
        // Don't add the chip if max was reached
        if (this.chips.length >= this.maxChips) return 

        this.chips.push({value, color: this.color})
        this.color = generateRandomColor()
        this.$refs.input.clear()
        this.typingChip = ''
      },
      handleTyping(value) {
        this.typingChip = value
      },
      clearAll() {
        this.chips = []
        this.$refs.input.clear()
        this.typingChip = ''
        this.$refs.input.focus()
      },
      deleteChip(index) {
        this.chips.splice(index, 1)
        this.$refs.input.focus()
      }
    }
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
    <input-area class="grow" ref="input"
    @submit="handleSubmit" 
    @typing="handleTyping" 
    :color="color" 
    :is-warning="chips.length >= maxChips && typingChip !== ''" 
    :placeholder="placeholder" 
    :autocomplete="autocomplete" 
    />
    <ul class="flex flex-wrap gap-1">
      <li v-for="({color, value}, index) in chips">
        <chip-item :color="color" :key="value" @close="deleteChip(index)">
          {{ value }}
        </chip-item>
      </li>
      <li>
        <chip-item v-if="typingChip" class="opacity-50" :color="color" :show-close="false">
          {{ typingChip }}
        </chip-item>
      </li>
    </ul>
    <div class="flex gap-1 items-center">
      <small :class="chips.length >= maxChips * 0.8 ? 'text-red-500' : 'text-stone-50'">max: {{ chips.length }}/{{ maxChips }}</small>
      <button class="underline text-stone-50 text-sm" title="Clear all" @click="clearAll">clear</button>
    </div>
  </div>
</template>