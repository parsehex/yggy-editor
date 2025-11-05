<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';
import getData from 'game/data/get';
import remove from 'data/remove';
import createData from 'data/create';

const props = defineProps({
	id: Number,
});

const store = useAppStore();
const { gameState, currentDialogue } = toRefs(store);

const choice = computed(() => getData('choices', props.id));

const choiceText = computed({
	get: () => choice.value.text,
	set: (newVal: string) => {
		const c = getData('choices', props.id);
		if (newVal === c.text) return;
		c.text = newVal;
	},
});

function deleteChoice() {
	remove.choice(props.id);
}

function goToDialogue() {
	const choice = getData('choices', props.id);
	if (gameState.value.currentDialogueID === choice.targetDialogueID) return;
	gameState.value.currentDialogueID = choice.targetDialogueID;
}

function createDialogueFromChoice() {
	const d = currentDialogue.value;
	const choiceId = props.id;
	const choice = getData('choices', choiceId);

	// use same background and character by default
	const newD = createData.dialogue(d);
	choice.targetDialogueID = newD.id;
}
</script>
<template>
	<div class="choice flex" :id="'choice-' + id">
		<textarea v-model="choiceText" placeholder="Choice text" />
		<button @click="deleteChoice" type="button">X</button>
		<button v-if="choice.targetDialogueID === null" @click="createDialogueFromChoice" class="create-dialogue"
			type="button" title="Attach a new dialogue to this choice">+ Dialogue</button>
		<button v-else @click="goToDialogue" type="button" title="Go to linked dialogue in-game">Go</button>
	</div>
</template>
