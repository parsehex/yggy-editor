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
import { delay } from 'common/utils';
import data from 'game/data';

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

	const editorVersion = await (await fetch('/api/version')).text();
	document.getElementById('version').textContent = 'v' + editorVersion;

	if (editorState.devMode) {
		document.getElementById('update-time').classList.remove('hidden');
	}

	// draw a few times to hopefully clear up any state issues
	for (let i = 0; i < 3; i++) {
		draw();
		await delay(10);
	}
});

// trigger game to redraw when the current dialogue is changed
watch(
	() => [currentDialogue.value, data, gameState],
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
<style lang="scss">
@import './index.css';

.hidden {
	display: none;
}

.error {
	background-color: #f44336;
	color: white;
}

.success {
	background-color: #4CAF50;
	color: white;
}

* {
	box-sizing: border-box;
}

select {
	font-size: 1em;
}

html,
body {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
}

iframe {
	width: 50%;
	height: 100%;
	border: 0;
	float: left;
}

button#game-size {
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0.5;

	&:hover {
		opacity: 1;
	}
}

div#editor {
	float: left;
	width: 50%;
	height: 100%;
	overflow-y: auto;

	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: auto 1fr;
}

div#editor>div.tab {
	display: none;
	height: 100%;
	overflow: auto;
	padding: 5px;

	&.active {
		display: block;
	}
}

div#version,
div#update-time {
	position: absolute;
	right: 0;
	top: 0;
	background-color: #ECEFF1;
	padding: 7px;
	font-size: 1.1em;
	opacity: 0.5;
	pointer-events: none;
	cursor: default;
	border-bottom-left-radius: 5px;
}

div#update-time {
	opacity: 0.8;
	padding: 7px;
	font-size: 0.85em;
}
</style>
