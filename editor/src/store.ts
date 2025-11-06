import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import stateFromGame from 'game/state';
import stateFromEditor from 'state';
import { computed } from 'vue';
import getData from 'game/data/get';

export const useAppStore = defineStore('app', () => {
	const tabs = [
		'dialogue',
		'tree',
		'characters',
		'backgrounds',
		'images',
		'utilities',
	];
	const openedTab = useStorage('editor-opened-tab', tabs[0]);

	const gameState = stateFromGame;
	const editorState = stateFromEditor;

	const currentDialogue = computed(() => {
		const id = gameState.currentDialogueID;
		if (id === null) return undefined;
		return getData('dialogue', id);
	});
	const currentBG = computed(() => {
		if (!currentDialogue.value) return undefined;
		const id = currentDialogue.value.backgroundID;
		if (id === null) return undefined;
		return getData('backgrounds', id);
	});

	return {
		tabs,
		openedTab,
		gameState,
		editorState,
		currentDialogue,
		currentBG,
	};
});
