import state from '../../src/state';
import elements, { initElements } from '../../src/elements';
import drawScene from '../../src/draw-scene';
import { loadData } from '../../src/data';

window.addEventListener('load', async () => {
	// the game tries to load the normal js and 404s so clear that
	console.clear();

	await loadData();
	state.currentDialogueIndex = 0;

	// hook up the elements to the elements within the iframe
	elements.doc = document.querySelector('iframe').contentDocument;
	initElements();

	drawScene();
});
