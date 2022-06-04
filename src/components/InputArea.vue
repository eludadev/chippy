<script>
	export default {
		props: {
			autocomplete: { type: Array, default: [] },
			isWarning: { type: Boolean, default: false },
			color: { type: String, default: '#fff' },
			placeholder: { type: String, default: '' }
		},
		emits: ['submit', 'typing'],
		data() {
			return {
				toAutocomplete: '',
				userInput: ''
			}
		},
		setup() {
				const whitespaceKeys = ['Enter', ' ', 'Tab']
				const visibleKeys = [',', ';']
				const submitKeys = [...whitespaceKeys, ...visibleKeys]

				const cancelAutocompleteKey = 'Backspace'
				const autocompleteKeys = [...submitKeys]

				return {
					submitKeys,
					autocompleteKeys,
					cancelAutocompleteKey
				}
		},
		methods: {
			onKeyup(event) {
				const key = event.key

				let value = this.userInput.trim()
				this.$emit('typing', value)

				if (this.submitKeys.includes(key)) {
					// Only submit if value is not empty
					if (value.length) {
						this.$emit('submit', value)
					} else {
						this.userInput = ''
					}
				}
			},
			onKeydown(event) {
				const key = event.key
	
				if (this.autocompleteKeys.includes(key)) {
					event.preventDefault()
					if (this.toAutocomplete) {
						this.autocompleteInput()
						this.$emit('submit', this.userInput)
					}
				}
				else if (this.cancelAutocompleteKey === key) {
					if (this.toAutocomplete) event.preventDefault()
					this.clearAutocomplete()
				}

			},
			onInput(event) {
				if (event.inputType !== 'deleteContentBackward') {
					this.updateAutocomplete()
				}
			},
			focus() {
				this.$refs.input.focus()
			},
			clear() {
				this.userInput = ''
				this.$refs.input.focus()
			},
			autocompleteInput() {
				this.userInput = toConsistentCase(this.userInput + this.toAutocomplete)
				this.clearAutocomplete()
			},
			clearAutocomplete() {
				this.toAutocomplete = ''
			},
			updateAutocomplete() {
				const getValue = () => {
					// Check if autocomplete is enabled
					if (!this.$props.autocomplete) return ''
					// If input is empty, then all autocomplete candidates match!
					if (!this.userInput.length) return ''

					for (const candidate of this.$props.autocomplete) {
						if (candidate.toLowerCase().startsWith(this.userInput.toLowerCase())) {
							// Return the last part that can be autocompleted
							// 'co|depen' -> 'depen'
							return candidate.slice(this.userInput.length)
						}
					}
					return ''
				}
				this.toAutocomplete = convertToCase(getValue(), this.userInput)
			}
		},
		expose: ['focus', 'clear']
	}

	function toConsistentCase(str) {
		const isLower = isLowerCase(str[0])

		return convertToCase(str, str[0])
	}

	function convertToCase(value, source) {
		const isLower = isLowerCase(source[0])

		return isLower ? value.toLowerCase() : value.toUpperCase()
	}

	function isLowerCase(str) {
		return str === str.toLowerCase()
	}
</script>

<template>
	<div class="relative">
		<input :class="['bg-stone-800 text-stone-50 px-2 py-1\
				    focus:outline-0 focus:filter focus:brightness-110',
				    {'ring-2 ring-red-800': $props.isWarning}]"
	   	ref="input"
		v-model="userInput"
	   	@keyup="onKeyup"
	   	@keydown="onKeydown"
		@input="onInput"
		:style="{ color: $props.color }"
		:placeholder="placeholder"
		/>
	   	<div class="absolute top-1 left-2 filter brightness-50 pointer-events-none"
	   	:style="{ color: $props.color }">
	   		<span class="opacity-0">{{ userInput }}</span>
	   		<span>{{ toAutocomplete }}</span>
	   	</div>
	</div>
</template>