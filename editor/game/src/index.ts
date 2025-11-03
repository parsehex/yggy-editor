import state from './state';
import gameDraw from './draw';
import { initElements } from './elements';
import loadData from './data/load';
import { initEvents } from './events';

window.addEventListener('load', async () => {
	await loadData();

	// TODO
	state.currentDialogueID = 0;
	initElements();
	initEvents();

	gameDraw();
});
