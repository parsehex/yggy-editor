<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';

const TAB_NAME = 'Tree';

const store = useAppStore();
const { openedTab } = toRefs(store);

const isActive = computed(() => openedTab.value === TAB_NAME.toLowerCase());
</script>
<template>
	<div :class="['tab', isActive ? 'active' : '']" :id="TAB_NAME + '-tab'">
		<div>
			<button type="button" class="undo" disabled>Undo last link</button>
		</div>
		<ul></ul>
	</div>
</template>
