import gameState from 'game/state';
import getData from 'game/data/get';
import _editorDelegate from 'delegate';
import draw from 'draw';
import remove from 'data/remove';
import createData from 'data/create';

export function initDialogueTabEvents() {
	// update dialogue
	_editorDelegate('textarea#dialogue', 'input', (e, t: HTMLTextAreaElement) => {
		const d = getData('dialogue', gameState.currentDialogueID);
		d.text = t.value;
		draw();
	});

	// update choice
	_editorDelegate('div#choices .choice', 'input', (e, t: HTMLTextAreaElement) => {
		const id = +t.dataset.id;
		const c = getData('choices', id);
		c.text = t.value;
		draw();
	});

	// add choice (to current dialogue)
	_editorDelegate('#choices button.add', 'click', () => {
		const d = getData('dialogue', gameState.currentDialogueID);
		const c = createData.choice();
		d.choices.push(c.id);
		draw();
	});

	// delete choice
	_editorDelegate('#choices button.delete', 'click', (e, t) => {
		const id = +t.dataset.id;
		remove.choice(id);
		draw();
	});

	// create dialogue from choice
	_editorDelegate('#choices button.create-dialogue', 'click', (e, t) => {
		const d = getData('dialogue', gameState.currentDialogueID);
		const choiceId = +t.dataset.id;
		const choice = getData('choices', choiceId);

		// use same background and character by default
		const newD = createData.dialogue(d.backgroundID, d.characterID);
		choice.targetDialogueID = newD.id;
		draw();
	});

	// change dialogue character
	_editorDelegate('select#character', 'click', (e, t: HTMLSelectElement) => {
		const charId = +t.value;
		const d = getData('dialogue', gameState.currentDialogueID);
		d.characterID = charId;
		draw();
	});

	// change dialogue background
	_editorDelegate('select#background', 'click', (e, t: HTMLSelectElement) => {
		const bgId = +t.value;
		const d = getData('dialogue', gameState.currentDialogueID);
		d.backgroundID = bgId;
		draw();
	});
}
