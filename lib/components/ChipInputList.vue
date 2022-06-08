<script setup>
	import { ref, computed } from 'vue'
  	import ChipItem from './ChipInputItem.vue'

  	const list = ref(null)

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

  	function focusLast() {
  		const container = list.value.$el
  		const children = container.children
  		if (children.length < 2) return
  		const elem = list.value.$el.children[1]
  		// Why use setTimeout: https://stackoverflow.com/questions/1096436/document-getelementbyidid-focus-is-not-working-for-firefox-or-chrome
  		setTimeout(() => elem.querySelector('button').focus(), 0)
  	}

	function onBeforeLeave(el) {
		const rect = el.getBoundingClientRect()
		el.style.setProperty('--x', `${Math.round(rect.x)}px`)
		el.style.setProperty('--y', `${Math.round(rect.y)}px`)
	}

	defineExpose({
		focusLast
	})
</script>

<template>
	<TransitionGroup name="list" ref="list" tag="ul"
	@before-leave="onBeforeLeave"
	role="listbox"
	aria-label="chips"
	aria-orientation="horizontal" 
	aria-multiselectable="false" 
	aria-live="polite"
	class="flex flex-wrap gap-1">
		<li 
		id="input"
		class="basis-20 grow order-2"
		:style="{order: props.chips.length+1}"
		:class="{'basis-full':props.inputIsOverflow}"
		:key="`USERINPUT`">
			<slot name="input"/>
		</li>

		<li 
		role="listitem"
		class="order-1"
		:style="{order: props.chips.length-(index+1)}"
		v-for="({color, value}, index) in props.chips"
		:key="value">
			<ChipItem 
			:value="value" 
			:color="color" 
			@delete="emit('delete', index)"
			/>
		</li>
	</TransitionGroup>
</template>

<style scoped>
/* Apply transition to moving elements */
.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.2s ease;
}

/* Don't animate input element to avoid jittery movement when user starts typing just after
creating a chip. */
#input {
	transition: none;
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