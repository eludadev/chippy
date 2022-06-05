<script>
  	import ChipItem from '@/components/ChipItem.vue'

	export default {
		components: {
			ChipItem
		},
		props: {
			chips: { type: Array, required: true }
		},
		emits: ['delete'],
		methods: {
			deleteChip(index) {
		        this.$emit('delete', index)
	      	},
	      	onBeforeLeave(el) {
	      		const rect = el.getBoundingClientRect()
	      		el.style.setProperty('--x', `${Math.round(rect.x)}px`)
	      		el.style.setProperty('--y', `${Math.round(rect.y)}px`)
	      	}
		},
		expose: ['clearAll']
	}
</script>

<template>
	<TransitionGroup name="list" tag="ul"
	@before-leave="onBeforeLeave"
	role="listbox" 
	aria-orientation="horizontal" 
	aria-multiselectable="false" 
	aria-live="polite"
	class="flex flex-wrap gap-1">
		<li v-for="({color, value}, index) in chips"
		:key="value">
			<chip-item :value="value" 
			:color="color" 
			@delete="deleteChip(index)"
			/>
		</li>
	</TransitionGroup>
</template>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(-10px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	position: absolute;
	left: var(--x);
	top: var(--y);
}
</style>