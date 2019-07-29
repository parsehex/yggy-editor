import state from '../../src/state';
import elements, { initElements } from '../../src/elements';
import drawScene from '../../src/draw-scene';

window.addEventListener('load', () => {
	state.currentDialogueIndex = 0;

	// hook up the elements to the elements within the iframe
	elements.doc = document.querySelector('iframe').contentDocument;
	initElements();

	drawScene();
});
