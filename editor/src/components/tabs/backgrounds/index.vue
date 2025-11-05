<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';

const TAB_NAME = 'Backgrounds';

const store = useAppStore();
const { openedTab } = toRefs(store);

const isActive = computed(() => openedTab.value === TAB_NAME.toLowerCase());
</script>
<template>
	<div :class="['tab', isActive ? 'active' : '']" :id="TAB_NAME + '-tab'">
		<button type="button" class="create">Create background</button>
		<div class="list"></div>
	</div>
</template>
