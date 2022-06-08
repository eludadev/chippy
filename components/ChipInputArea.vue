<script setup>
	import { ref, reactive, watch, computed, onMounted } from 'vue'
	import { useDebounceFn, breakpointsTailwind, useBreakpoints } from '@vueuse/core'
	import { toConsistentCase, convertToCase } from '@/helpers/text.js'

	const props = defineProps({
		id: {
			type: String,
			default: ''
		},
		autocomplete: { 
			type: Array, 
			default: [] 
		},
		color: { 
			type: String, 
			default: '#fff' 
		},
		placeholder: { 
			type: String, 
			default: '' 
		},
		modelValue: {
			type: String
		}
	})

	const emit = defineEmits({
		submit: {
			value: String
		},
		delete: {
			value: null
		},
		'update:modelValue': {
			value: String
		}
	})

	// Reactive reference to <input>
	const input = ref(null)

	const state = reactive({
		autocompletePossibilities: [],
		toAutocomplete: '',
		userInput: ''
	})
	const overflow = reactive({
		widthPriorToOverflow: 0,
		isOverflow: false
	})
	const backspaceToDelete = reactive({
		keyupHappened: false
	})

	const breakpoints = useBreakpoints(breakpointsTailwind)
	const smAndLarger = breakpoints.greater('sm')

	onMounted(() => {
		state.autocompletePossibilities = props.autocomplete
		overflow.widthPriorToOverflow = input.value.offsetWidth
	})


	const whitespaceKeys = ['Enter', ' ', 'Tab']
	const visibleKeys = [',', ';']
	const submitKeys = [...whitespaceKeys, ...visibleKeys]
	
	function onKeyup(event) {
		// We only want to check the last character
		const lastChar = event.target.value.slice(-1)
		const key = event.key

		if (submitKeys.includes(lastChar) || submitKeys.includes(key)) {
			// Remove last visible submit character (',', ' ', ...) if it exists
			if (submitKeys.includes(lastChar)) {
				state.userInput = state.userInput.slice(0,-1)
			}
			// Only submit if value is not empty
			if (state.userInput.length) {
				submit()
			} else {
				state.userInput = ''
			}
		}

		// Do not delete a chip when the backspace key is being held, because what if
		// the user's intentions were to just erase the input?
		backspaceToDelete.keyupHappened = true
	}


	const autocompleteKeys = [...submitKeys]

	function onKeydown(event) {
		// We only want to check the last character
		const lastChar = event.target.value.slice(-1)
		const key = event.key

		if (autocompleteKeys.includes(lastChar) || autocompleteKeys.includes(key)) {
			event.preventDefault()
			if (state.toAutocomplete) {
				submit()
			}
		}

		if (key === 'Backspace' && state.userInput.length === 0 && backspaceToDelete.keyupHappened) {
			emit('delete')
		}

		backspaceToDelete.keyupHappened = false
	}

	function onInput(event) {
		let value = event.target.value.trimLeft()

		const pressedBackspace = value === state.userInput.slice(0,-1)

		if (!pressedBackspace) {
			updateAutocomplete(value.trimRight())
		} else {
			// Only clear autocomplete if caret was at end of input field
			const caretPosition = event.target.selectionStart
			if (caretPosition === value.length) {
				// If first time hitting backspace, return the deleted character
				// Next time hitting backspace, autocomplete will be gone and you
				// can delete the character
				if (state.toAutocomplete) {
					value = state.userInput
					clearAutocomplete()
				}
			} else {
				updateAutocomplete(value)
			}
		}
		state.userInput = value
		input.value.value = state.userInput

		emit('update:modelValue', state.userInput)
	}

	function focus() {
		input.value.focus()
	}

	function clear() {
		input.value.value = ''
		state.userInput = ''
		emit('update:modelValue', state.userInput)
		
		focus()
	}

	function autocompleteInput() {
		state.userInput = state.userInput.trimRight() + state.toAutocomplete
		clearAutocomplete()
	}

	function clearAutocomplete() {
		state.toAutocomplete = ''
	}

	function updateAutocomplete(value) {
		const getValue = () => {
			// Check if autocomplete is enabled
			if (!props.autocomplete) return ''
			// If input is empty, then all autocomplete candidates match!
			if (!value.length) return ''

			for (const candidate of props.autocomplete) {
				if (candidate.toLowerCase().startsWith(value.toLowerCase())) {
					// Return the last part that can be autocompleted
					// 'co|depen' -> 'depen'
					return candidate.slice(value.length)
				}
			}
			return ''
		}
		state.toAutocomplete = convertToCase(getValue(), value)
	}

	function submit(autocomplete) {
		autocompleteInput()
		emit('submit', toConsistentCase(state.userInput))
		toggleOverflow(false)
	}
		
	const datalist = computed(() => {
		return props.autocomplete
		.filter(a => a.toLowerCase().startsWith(state.userInput.toLowerCase()))
	})


	watch(() => state.userInput, updateOverflow)

	function updateOverflow() {
		const fullText = state.userInput.trimRight() + state.toAutocomplete
		const fontSize = input.value.computedStyleMap().get('font-size').value
		if (input.value && overflow.widthPriorToOverflow/fullText.length < fontSize) {
			toggleOverflowDebounce(true)
		} else if (input.value) {
			toggleOverflowDebounce(false)
			overflow.widthPriorToOverflow = input.value.offsetWidth
		}
	}

	function toggleOverflow(newState) {
		overflow.isOverflow = newState
	}

	// We don't want the overflow state to abruptly change (causes a janky animation).
	const toggleOverflowDebounce = useDebounceFn((newState) => {
		toggleOverflow(newState)
	}, 400)

	defineExpose({
		clear,
		focus,
		getIsOverflow: () => overflow.isOverflow
	})
</script>

<template>
	<div class="relative overflow-hidden w-full h-full">
		<input 
		class="bg-transparent w-full h-full text-stone-50 px-2 py-1
		focus:outline-0 focus:filter focus:brightness-110"
	   	ref="input"
	   	:id="props.id"
	   	@keyup="onKeyup"
	   	@keydown="onKeydown"
		@input="onInput"
		:style="{ color: props.color }"
		:placeholder="props.placeholder"
		autocomplete="off"
		:list="smAndLarger && 'autocomplete-list'"
		:value="props.modelValue"
		/>
	   	<div class="absolute top-[2px] left-2 filter brightness-50 pointer-events-none"
	   	:style="{ color: props.color }">
	   		<span class="opacity-0">{{ state.userInput }}</span>
	   		<span>{{ state.toAutocomplete }}</span>
	   	</div>

		<!-- Datalist is hidden on mobile (smAndLarger) -->
	   	<datalist id="autocomplete-list">
	   		<option :value="item" v-for="item in datalist"/>
	   	</datalist>
	</div>
</template>