<script setup lang="ts">
import gameState from 'game/state';
import { initElements } from 'game/elements';
import { initEvents as initGameEvents } from 'game/events';
import { initEventHooks } from './event-hooks';
import draw from './draw';
import { initEditorEvents } from './events';
import editorState from './state';
import { initIDService } from './id-service';
import _editorLoadData from 'data/load';
import updateLocalData from 'data/update';
import { initServiceWorker } from 'worker-controller';

import { toRefs, watch } from 'vue';
import { useAppStore } from 'store';
import Header from 'components/header/index.vue';
import DialogueTab from 'components/tabs/dialogue/index.vue';
import TreeTab from 'components/tabs/tree/index.vue';
import CharactersTab from 'components/tabs/characters/index.vue';
import BackgroundsTab from 'components/tabs/backgrounds/index.vue';
import ImagesTab from 'components/tabs/images/index.vue';
import UtilitiesTab from 'components/tabs/utilities/index.vue';

const store = useAppStore();
const { currentDialogue } = toRefs(store);

window.addEventListener('load', async () => {
	if (window !== window.top) {
		// the game in the iframe is trying to run; do nothing
		return;
	}
	await initServiceWorker();

	updateLocalData();

	await _editorLoadData();
	initIDService();

	gameState.currentDialogueID = 0;
	editorState.history.push(0);
	editorState.currentHistoryIndex = 0;

	initElements();
	initEventHooks();
	initGameEvents();
	initEditorEvents();

	draw();

	const editorVersion = await (await fetch('/api/version')).text();
	document.getElementById('version').textContent = 'v' + editorVersion;

	if (editorState.devMode) {
		document.getElementById('update-time').classList.remove('hidden');
	}
});

// trigger game to redraw when the current dialogue is changed
watch(
	() => currentDialogue.value,
	() => {
		draw();
	},
	{ deep: true, immediate: true }
);
</script>
<template>
	<div id="editor">
		<Header />
		<!-- TODO shadcn: Tabs, TabsContent, Header contains tab buttons -->
		<DialogueTab />
		<TreeTab />
		<CharactersTab />
		<BackgroundsTab />
		<ImagesTab />
		<UtilitiesTab />
	</div>
</template>
