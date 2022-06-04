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

				const autocompleteKeys = [...submitKeys]

				return {
					submitKeys,
					autocompleteKeys
				}
		},
		mounted() {
			this.autocompleteList = this.$props.autocomplete
		},
		methods: {
			onKeyup(event) {
				// We only want to check the last character
				const lastChar = event.target.value.slice(-1)
				const key = event.key

				if (this.submitKeys.includes(lastChar) || this.submitKeys.includes(key)) {
					// Remove last visible submit character (',', ' ', ...) if it exists
					if (this.submitKeys.includes(lastChar)) {
						this.userInput = this.userInput.slice(0,-1)
					}
					// Only submit if value is not empty
					if (this.userInput.length) {
						this.autocompleteInput()
						this.$emit('submit', toConsistentCase(this.userInput))
					} else {
						this.userInput = ''
					}
				}
			},
			onKeydown(event) {
				// We only want to check the last character
				const lastChar = event.target.value.slice(-1)
				const key = event.key

				if (this.autocompleteKeys.includes(lastChar) || this.autocompleteKeys.includes(key)) {
					event.preventDefault()
					if (this.toAutocomplete) {
						this.autocompleteInput()
						this.$emit('submit', this.userInput)
					}
				}
			},
			onInput(event) {
				let value = event.target.value.trimLeft()
				this.$emit('typing', value)

				const pressedBackspace = value === this.userInput.slice(0,-1)

				if (!pressedBackspace) {
					this.updateAutocomplete(value.trimRight())
				} else {
					// Only clear autocomplete if caret was at end of input field
					const caretPosition = event.target.selectionStart
					if (caretPosition === value.length) {
						// If first time hitting backspace, return the deleted character
						// Next time hitting backspace, autocomplete will be gone and you
						// can delete the character
						if (this.toAutocomplete) {
							value = this.userInput
							this.clearAutocomplete()
						}
					} else {
						this.updateAutocomplete(value)
					}
				}
				this.userInput = value
				this.$refs.input.value = this.userInput
			},
			focus() {
				this.$refs.input.focus()
			},
			clear() {
				this.$refs.input.value = ''
				this.$refs.input.focus()
				this.userInput = ''
			},
			autocompleteInput() {
				this.userInput = toConsistentCase(this.userInput.trimRight() + this.toAutocomplete)
				this.clearAutocomplete()
			},
			clearAutocomplete() {
				this.toAutocomplete = ''
			},
			updateAutocomplete(value) {
				const getValue = () => {
					// Check if autocomplete is enabled
					if (!this.$props.autocomplete) return ''
					// If input is empty, then all autocomplete candidates match!
					if (!value.length) return ''

					for (const candidate of this.$props.autocomplete) {
						if (candidate.toLowerCase().startsWith(value.toLowerCase())) {
							// Return the last part that can be autocompleted
							// 'co|depen' -> 'depen'
							return candidate.slice(value.length)
						}
					}
					return ''
				}
				this.toAutocomplete = convertToCase(getValue(), value)
			}
		},
		expose: ['focus', 'clear']
	}

	function toConsistentCase(str) {
		if (str.length) {
			const source = str.slice(-1)
			return convertToCase(str, source)
		}
		else {
			return ''
		}
	}

	function convertToCase(value, source) {
		const isLower = source.length ? isLowerCase(source.slice(-1)) : false

		return isLower ? value.toLowerCase() : value.toUpperCase()
	}

	function isLowerCase(str) {
		return str === str.toLowerCase()
	}
</script>

<template>
	<form class="relative" @submit.prevent>
		<input :class="['bg-stone-800 text-stone-50 px-2 py-1\
				    focus:outline-0 focus:filter focus:brightness-110',
				    {'ring-2 ring-red-800': $props.isWarning}]"
	   	ref="input"
	   	@keyup="onKeyup"
	   	@keydown="onKeydown"
		@input="onInput"
		:style="{ color: $props.color }"
		:placeholder="placeholder"
		list="autocomplete-list"
		/>
	   	<div class="absolute top-1 left-2 filter brightness-50 pointer-events-none"
	   	:style="{ color: $props.color }">
	   		<span class="opacity-0">{{ userInput }}</span>
	   		<span>{{ toAutocomplete }}</span>
	   	</div>

	   	<datalist id="autocomplete-list">
	   		<option :value="item" v-for="item in $props.autocomplete"/>
	   	</datalist>
	</form>
</template>