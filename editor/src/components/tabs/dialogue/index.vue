<script setup lang="ts">
import { useAppStore } from 'store';
import { computed, toRefs } from 'vue';
import getData from 'game/data/get';
import data from 'game/data';

const TAB_NAME = 'Dialogue';

const store = useAppStore();
const { openedTab, gameState, currentDialogue, currentBG } = toRefs(store);

const isActive = computed(() => openedTab.value === TAB_NAME.toLowerCase());

const currentDialogueText = computed({
	get: () => {
		if (!currentDialogue.value) return undefined;
		return currentDialogue.value.text;
	},
	set: (newText: string) => {
		const d = getData('dialogue', gameState.value.currentDialogueID);
		d.text = newText;
	},
});
const currentBGId = computed({
	get: () => {
		if (!currentDialogue.value) return undefined;
		return currentDialogue.value.backgroundID;
	},
	set: (bgId: string) => {
		const id = +bgId;
		if (!(id >= 0)) throw new Error('Non-number ID: ' + bgId);
		const d = getData('dialogue', gameState.value.currentDialogueID);
		d.backgroundID = id;
	},
});
</script>
<template>
	<div :class="['tab', isActive ? 'active' : '']" :id="TAB_NAME + '-tab'">
		<div class="characters"></div>
		<div>
			<span>Background: </span>
			<select v-if="currentBG" class="background" v-model="currentBGId">
				<option v-for="bg in data.backgrounds" :key="bg.id.toString()" :value="bg.id.toString()">{{ bg.name }}</option>
			</select>
		</div>
		<div id="dialogue-wrapper">
			<span>Dialogue: </span>
			<textarea type="text" class="dialogue" cols="40" rows="3" placeholder="Dialogue text"
				v-model="currentDialogueText"></textarea>
		</div>
		<h3>Choices</h3>
		<div class="choices"></div>
	</div>
</template>
