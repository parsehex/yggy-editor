<script setup lang="ts">
import TabButton from './TabButton.vue';
import { useAppStore } from 'store';
import { toRefs } from 'vue';

const store = useAppStore();
const { tabs, openedTab } = toRefs(store);

function handleClick(e: MouseEvent) {
	const t = e.target as HTMLSpanElement;

	const tabId = t.dataset.target;
	openedTab.value = tabId;

	// TODO emit changed tab
}
</script>
<template>
	<div id="tabs-list">
		<TabButton v-for="tab in tabs" :key="tab" @click="handleClick" :active="openedTab === tab" :target="tab" />
	</div>
</template>
