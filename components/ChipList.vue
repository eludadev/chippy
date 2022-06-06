<script setup>
  	import ChipItem from '@/components/ChipItem.vue'

  	const props = defineProps({
  		chips: {
  			type: Array,
  			required: true
  		},
  		inputIsOverflow: {
  			type: Boolean,
  			default: false
  		}
  	})

  	const emit = defineEmits({
  		delete: {
  			index: Number
  		}
  	})

	function onBeforeLeave(el) {
		const rect = el.getBoundingClientRect()
		el.style.setProperty('--x', `${Math.round(rect.x)}px`)
		el.style.setProperty('--y', `${Math.round(rect.y)}px`)
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
		<li v-for="({color, value}, index) in props.chips"
		:key="value">
			<ChipItem 
			:value="value" 
			:color="color" 
			@delete="emit('delete', index)"
			/>
		</li>
		<li :class="['basis-20 grow', {'basis-full':props.inputIsOverflow}]" :key="`USERINPUT`"><slot name="input"/></li>
	</TransitionGroup>
</template>

<style>
/* Apply transition to moving elements */
.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(-10px);
}

/* Ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	position: absolute;
	left: var(--x);
	top: var(--y);
}
</style>