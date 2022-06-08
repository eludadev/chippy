<script setup>
	import { computed } from 'vue'

	const props = defineProps({
		color: {
			type: String,
			default: '#fff'
		},
		value: {
			type: String,
			required: true
		}
	})

	const emit = defineEmits(['delete'])

	const buttonTitle = computed(() => {
		return `Remove ${props.value}`
	})
</script>

<template>
	<button class="block relative rounded-full py-0.5 pl-4 px-4 hover:filter
	hover:brightness-110 active:brightness-90 overflow-hidden
	group" 
	:style="{ backgroundColor: props.color }"
	@click="emit('delete')"
	:title="buttonTitle">
		<span class="block relative group-focus:-translate-x-1.5 group-hover:-translate-x-1.5 transition-transform">{{ props.value }}</span>
		<svg class="w-4 h-4 fill-black absolute top-1/2 right-1.5
		transform translate-y-32 group-focus:-translate-y-1/2 group-hover:-translate-y-1/2 transition-transform" 
		viewBox="0 0 24 24">
			<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
		</svg>
	</button>
</template>