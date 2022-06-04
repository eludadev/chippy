<script setup>
	import { ref, defineProps, defineEmits, defineExpose } from 'vue'

	const input = ref(null)

	const props = defineProps({
		is_warning: { type: Boolean, default: false }
	})

	const emit = defineEmits(['submit', 'typing'])

	function handleKeyup(event) {
		const input_elem = event.target
		const key = event.key

		const whitespace_keys = ['Enter', ' ']
		const visible_keys = [',', ';']
		const submit_keys = [...whitespace_keys, ...visible_keys]

		if (submit_keys.includes(key)) {
			let value = input_elem.value.trim()
			// Delete the visible key (, or ; etc...) if it exists
			if (visible_keys.includes(key)) value = value.slice(0, -1)

			// Only submit if value is not empty
			if (value.length) {
				emit('submit', value)
			} else {
				input_elem.value = ''
			}
		}
		else {
			let value = input_elem.value.trim()
			emit('typing', value)
		}
	}

	function focus() {
		input.value.focus()
	}

	function clear() {
		const input_elem = input.value

		input_elem.value = ''
		input_elem.focus()
	}

	defineExpose({
		focus,
		clear
	})
</script>

<template>
	<input :class="['bg-stone-800 text-stone-50 px-2 py-1\
				    focus:outline-0 focus:filter focus:brightness-110',
				    {'border-2 border-red-800': is_warning}]"
		   @keyup="handleKeyup"
		   ref="input"/>
</template>