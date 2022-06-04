<script setup>
	import { defineProps, defineEmits } from 'vue'

	const emit = defineEmits(['close'])

	const props = defineProps({
		text: { type: String, required: true },
		color: { type: String, default: '#fff' },
		show_close: { type: Boolean, default: true }
	})

	function close() {
		emit('close')
	}
</script>

<template>
	<article v-show="props.text" :class="['flex items-center gap-1 rounded-full py-0.5 pl-4 pr-1', {'pr-4': !props.show_close}]" :style="{ backgroundColor: props.color }">
		{{ props.text }}
		<button v-if="props.show_close" class="w-6 h-6 p-1 hover:filter hover:brightness-110 rounded-full" :style="{ backgroundColor: props.color }" @click="close">
			<svg class="w-full h-full fill-black" viewBox="0 0 24 24">
				<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
			</svg>
		</button>
	</article>
</template>