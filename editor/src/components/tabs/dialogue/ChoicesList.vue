<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';
import getData from 'game/data/get';
import data from 'game/data';
import Choice from './Choice.vue';
import createData from 'data/create';

const store = useAppStore();
const { gameState, currentDialogue, currentBG } = toRefs(store);

function addChoice() {
	const c = createData.choice();
	currentDialogue.value.choices.push(c.id);
}
</script>
<template>
	<h3>Choices</h3>
	<div v-if="currentDialogue" class="choices space-y-2 mx-2">
		<Choice v-for="choice in currentDialogue.choices" :key="'choice-' + choice" class="choice" :id="choice" />
		<button @click="addChoice" class="create" type="button" title="Add choice">+ Choice</button>
	</div>
</template>
<style scoped>
h3 {
	border-bottom: 1px dashed gray;
}
</style>
