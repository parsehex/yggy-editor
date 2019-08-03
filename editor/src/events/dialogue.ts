import gameState from 'game/state';
import getData from 'game/data/get';
import _editorDelegate from 'delegate';
import draw from 'draw';
import remove from 'data/remove';
import createData from 'data/create';

export function initDialogueTabEvents() {
	const tab = '#dialogue-tab';
	const firstCharacter = `${tab} div.character:first-of-type`;
	const secondCharacter = `${tab} div.character:last-of-type`;

	// update dialogue
	_editorDelegate(`${tab} textarea.dialogue`, 'input', (e, t: HTMLTextAreaElement) => {
		const d = getData('dialogue', gameState.currentDialogueID);
		d.text = t.value;
		draw();
	});

	// update choice
	_editorDelegate(`${tab} div.choices textarea.text`, 'input', (e, t: HTMLTextAreaElement) => {
		const id = +t.closest('div.choice').dataset.id;
		const c = getData('choices', id);
		c.text = t.value;
		draw();
	});

	// add choice (to current dialogue)
	_editorDelegate(`${tab} div.choices button.create`, 'click', () => {
		const d = getData('dialogue', gameState.currentDialogueID);
		const c = createData.choice();
		d.choices.push(c.id);
		draw();
	});

	// delete choice
	_editorDelegate(`${tab} div.choices button.delete`, 'click', (e, t) => {
		const id = +t.closest('div.choice').dataset.id;
		remove.choice(id);
		draw();
	});

	// create dialogue from choice
	_editorDelegate(`${tab} div.choices button.create-dialogue`, 'click', (e, t) => {
		const d = getData('dialogue', gameState.currentDialogueID);
		const choiceId = +t.closest('div.choice').dataset.id;
		const choice = getData('choices', choiceId);

		// use same background and character by default
		const newD = createData.dialogue(d.backgroundID, d.characterID);
		choice.targetDialogueID = newD.id;
		draw();
	});

	// change first (left) dialogue character
	_editorDelegate(`${firstCharacter} select.name`, 'click', (e, t: HTMLSelectElement) => {
		const d = getData('dialogue', gameState.currentDialogueID);
		const charId = +t.value;
		d.characterID = charId;
		d.characterFrameIndex = 0; // default frame index
		draw();
	});

	// change first (left) dialogue character frame
	_editorDelegate(`${firstCharacter} select.frame`, 'click', (e, t: HTMLSelectElement) => {
		const d = getData('dialogue', gameState.currentDialogueID);
		const frameIndex = t.value === 'none' ? null : +t.value;
		d.characterFrameIndex = frameIndex;
		draw();
	});

	// change dialogue background
	_editorDelegate(`${tab} select.background`, 'click', (e, t: HTMLSelectElement) => {
		const d = getData('dialogue', gameState.currentDialogueID);
		const bgId = +t.value;
		d.backgroundID = bgId;
		draw();
	});
}
