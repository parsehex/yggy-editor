import _editorDelegate from 'delegate';
import lookupData from 'game/data/lookup';
import editorState from 'state';
import gameState from 'game/state';
import draw from 'draw';
import { push } from 'navigation';
import { querySelector } from 'dom-util';

export default function initTreeTabEvents() {
	// toggle item collapse
	_editorDelegate('#tree-tab li > span.text', 'click', (e, t) => {
		const li = <HTMLLIElement>t.closest('li');
		const newState = li.classList.toggle('collapsed');
		const id = +li.dataset.id;

		const isDialogue = /dialogue/i.test(li.className);
		const list = isDialogue ? editorState.tree.collapsed.dialogue : editorState.tree.collapsed.choices;

		if (newState) {
			list.push(id);
		} else {
			list.splice(list.indexOf(id), 1);
		}
	});

	// go to dialogue
	_editorDelegate('#tree-tab li.dialogue > button.go-to', 'click', (e, t) => {
		const li = <HTMLLIElement>t.closest('li');
		const id = +li.dataset.id;
		if (gameState.currentDialogueID === id) return;
		gameState.currentDialogueID = id;
		push(id);
		draw();
	});

	// highlight referenced dialogue
	_editorDelegate('#tree-tab li.dialogue.reference > span.text', 'mouseover', (e, t) => {
		const li = <HTMLLIElement>t.closest('li.dialogue');
		const id = +li.dataset.id;
		const dEl = querySelector(`#tree-tab li.dialogue:not(.reference)[data-id="${id}"]`);
		dEl.classList.add('highlight');
	});
	_editorDelegate('#tree-tab li.dialogue.reference > span.text', 'mouseout', (e, t) => {
		const li = <HTMLLIElement>t.closest('li.dialogue');
		const id = +li.dataset.id;
		const dEl = querySelector(`#tree-tab li.dialogue:not(.reference)[data-id="${id}"]`);
		dEl.classList.remove('highlight');
	});
}
