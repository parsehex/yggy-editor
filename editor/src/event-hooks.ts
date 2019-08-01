import del from 'game/delegate';
import gameState from 'game/state';
import updateActiveTab from './update-tab';
import { push } from './navigation';

export function initEventHooks() {
	/*
		These event handlers have to be triggered before the game events since the
		game may have removed the firing elements by the time these events are handled,
		which will prevent these events from being delegated correctly.
		So do 2 things:
		1. Setup these handlers first so that they run before the game's handlers.
		2. Use setTimeout to wait for the game to do whatever it needs to do before
		running these handlers.
	*/
	const delegate = function (sel: string, type: string, cb: (ev: Event, target: HTMLElement) => void) {
		del(sel, <any>type, (e, t) => {
			setTimeout(() => {
				cb(e, t);
			}, 0);
		});
	};

	// update editor stuff on choice click
	delegate('div#choices button.choice', 'click', (e) => {
		// drawScene() already called
		push(gameState.currentDialogueID);
		updateActiveTab();
	});
}
