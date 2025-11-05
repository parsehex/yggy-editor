<script setup lang="ts">
	import { computed } from 'vue';
	
	const props = defineProps({
		active: Boolean,
		target: String,
	});
	
	const targetName = computed(() => {
		if (!props.target) return '';
		const first = props.target[0];
		const rest = props.target.substring(1);
		return first.toUpperCase() + rest;
	})
</script>

<template>
	<span :class="['link', active ? 'active' : '']" :data-target="target">{{ targetName }}</span>
</template>