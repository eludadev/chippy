<script>
	export default {
		props: {
			color: { type: String, default: '#fff' },
			showClose: { type: Boolean, default: true }
		},
		emits: ['close'],
		methods: {
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<template>
	<article :class="['flex items-center gap-1 rounded-full py-0.5 pl-4 pr-1', {'pr-4': !$props.showClose}]" :style="{ backgroundColor: $props.color }">
		<slot/>
		<button v-if="$props.showClose" class="w-6 h-6 p-1 hover:filter hover:brightness-110 rounded-full" :style="{ backgroundColor: $props.color }" @click="close" title="Remove">
			<svg class="w-full h-full fill-black" viewBox="0 0 24 24">
				<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
			</svg>
		</button>
	</article>
</template>