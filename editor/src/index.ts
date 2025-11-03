import gameState from 'game/state';
import { initElements } from 'game/elements';
import { initEvents as initGameEvents } from 'game/events';
import { initEventHooks } from './event-hooks';
import draw from './draw';
import { initEditorEvents } from './events';
import editorState from './state';
import { initIDService } from './id-service';
import { initTabs } from 'tabs';
import _editorLoadData from 'data/load';
import updateLocalData from 'data/update';
import { initServiceWorker } from 'worker-controller';

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
	initTabs();

	draw();

	const editorVersion = await (await fetch('/api/version')).text();
	document.getElementById('version').textContent = 'v' + editorVersion;

	if (editorState.devMode) {
		document.getElementById('update-time').classList.remove('hidden');
	}
});
