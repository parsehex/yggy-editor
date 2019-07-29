import state from '../../src/state';
import elements, { initElements } from '../../src/elements';
import { loadData } from '../../src/data';
import { initEvents as initGameEvents } from '../../src/events';
import { initEventHooks } from './event-hooks';
import draw from './draw';
import { initEditorEvents } from './events';
import editorState from './state';
import { initIDService } from './id-service';

window.addEventListener('load', async () => {
	// the game tries to load the normal js and 404s so clear that
	console.clear();

	await loadData();
	initIDService();

	state.currentDialogueID = 0; // TODO
	editorState.history.push(0);
	editorState.currentHistoryIndex = 0;

	// hook up the elements to the elements within the iframe
	// elements.doc = document.querySelector('iframe').contentDocument;
	initElements();
	initEventHooks();
	initGameEvents();
	initEditorEvents();

	draw()
});
