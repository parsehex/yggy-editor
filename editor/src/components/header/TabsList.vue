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
		<a href="https://parsehex.github.io/yggy-editor/docs/" class="link text-blue-600" target="_blank">Docs</a>
	</div>
</template>
<style lang="scss">
div#tabs-list {
	margin: 9px 0;
	cursor: default;

	.link {
		cursor: pointer;
		margin: 0;
		padding: 2px 5px;
		border: 1px solid;

		&:hover {
			text-decoration: underline;
		}

		&.active {
			font-weight: bold;
		}
	}
}
</style>
