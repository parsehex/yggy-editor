import gameState from 'game/state';
import getData from 'game/data/get';
import _editorDelegate from 'delegate';
import draw from 'draw';
import remove from 'data/remove';
import createData from 'data/create';

export function initDialogueTabEvents() {
	const tab = '#dialogue-tab';

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
		const newD = createData.dialogue(d);
		choice.targetDialogueID = newD.id;
		draw();
	});

	// change character
	_editorDelegate(`${tab} div.characters .character select.name`, 'click', (e, t: HTMLSelectElement) => {
		const isFirst = t.closest('div.character').matches(':first-of-type');
		const d = getData('dialogue', gameState.currentDialogueID);
		const oldCharId = +t.closest('div.character').dataset.id;
		const charId = t.value;

		let characterIDVal: number;
		let characterFrameIndexVal: number;
		if (charId === 'none') {
			characterIDVal = null;
			characterFrameIndexVal = null;
		} else {
			characterIDVal = +charId;
			characterFrameIndexVal = 0; // default frame index
		}

		if (
			// it's fine to not have any characters set
			characterIDVal !== null &&
			(
				(isFirst && characterIDVal === d.character2ID) ||
				(!isFirst && characterIDVal === d.character1ID)
			)
		) {
			// don't allow setting the same character for both 1 and 2
			// set this select value back
			const val = isFirst ? d.character1ID : d.character2ID;
			t.value = val === null ? 'none' : val.toString();
			return;
		}

		// if dialogue had no characters but now it does:
		// (this check must happen before changing character in dialogue)
		if (
			characterIDVal !== null &&
			d.ownerCharacterID === null &&
			d.character1ID === null &&
			d.character2ID === null
		) {
			// set the owner to whatever the new character is
			// (to avoid having no owner character when there's at least 1 character in the dialogue)
			d.ownerCharacterID = characterIDVal;
		}

		if (isFirst) {
			d.character1ID = characterIDVal;
			d.character1FrameIndex = characterFrameIndexVal;
		} else {
			d.character2ID = characterIDVal;
			d.character2FrameIndex = characterFrameIndexVal;
		}

		if (charId === 'none' && oldCharId === d.ownerCharacterID) {
			// avoid having dialogue owner be a character that's not in the dialogue
			d.ownerCharacterID = null;
		}

		if (
			charId === 'none' && d.ownerCharacterID === null &&
			(d.character1ID !== null || d.character2ID !== null)
		) {
			// don't allow there to be no owner if there's a character in the dialogue
			if (d.character1ID !== null) {
				d.ownerCharacterID = d.character1ID;
			} else if (d.character2ID !== null) {
				d.ownerCharacterID = d.character2ID;
			}
		}

		draw();
	});

	// change character frame
	_editorDelegate(`${tab} div.characters .character select.frame`, 'click', (e, t: HTMLSelectElement) => {
		const isFirst = t.closest('div.character').matches(':first-of-type');
		const d = getData('dialogue', gameState.currentDialogueID);
		const frameIndex = t.value;

		let characterFrameIndexVal: number;
		if (frameIndex === 'none') {
			characterFrameIndexVal = null;
		} else {
			characterFrameIndexVal = +frameIndex;
		}

		if (isFirst) {
			d.character1FrameIndex = characterFrameIndexVal;
		} else {
			d.character2FrameIndex = characterFrameIndexVal;
		}
		draw();
	});

	// change dialogue owner
	_editorDelegate(`${tab} div.characters .character input.owner`, 'change', (e, t: HTMLSelectElement) => {
		const d = getData('dialogue', gameState.currentDialogueID);
		const charId = t.closest('.character').dataset.id;
		d.ownerCharacterID = charId === 'none' ? null : +charId;
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
