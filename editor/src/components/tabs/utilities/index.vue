<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';

const TAB_NAME = 'Utilities';

const store = useAppStore();
const { openedTab } = toRefs(store);

const isActive = computed(() => openedTab.value === TAB_NAME.toLowerCase());
</script>
<template>
	<div :class="['tab', isActive ? 'active' : '']" :id="TAB_NAME + '-tab'">
		<div>
			<button type="button" class="remove-orphans"> Remove orphaned data </button>
		</div>
		<div>
			<button type="button" class="reset-everything">Reset Everything</button>
			<span>Completely resets all data</span>
		</div>
	</div>
</template>
