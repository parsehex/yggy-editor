<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';

const TAB_NAME = 'Characters';

const store = useAppStore();
const { openedTab } = toRefs(store);

const isActive = computed(() => openedTab.value === TAB_NAME.toLowerCase());
</script>
<template>
	<div :class="['tab', isActive ? 'active' : '']" :id="TAB_NAME + '-tab'">
		<button type="button" class="create">Create character</button>
		<div class="list"></div>
	</div>
</template>
<style lang="scss">
div#characters-tab {
	div.character {
		margin: 8px 2px;
		padding: 3px;

		&:nth-child(2n) {
			background-color: #EEEEEE;
			border-top: 1px solid #9E9E9E;
		}
	}

	div.frame {
		margin: 3px 10px;

		.name {
			margin-right: 7px;
		}

		button.delete {
			margin-left: 1px;
		}
	}
}
</style>
