<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';

const TAB_NAME = 'Dialogue';

const store = useAppStore();
const { openedTab } = toRefs(store);

const isActive = computed(() => openedTab.value === TAB_NAME.toLowerCase());
</script>
<template>
	<div :class="['tab', isActive ? 'active' : '']" :id="TAB_NAME + '-tab'">
		<div class="characters"></div>
		<div>
			<span>Background: </span>
			<select class="background"></select>
		</div>
		<div id="dialogue-wrapper">
			<span>Dialogue: </span>
			<textarea type="text" class="dialogue" cols="40" rows="3" placeholder="Dialogue text"></textarea>
		</div>
		<h3>Choices</h3>
		<div class="choices"></div>
	</div>
</template>
