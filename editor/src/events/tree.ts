import _editorDelegate from 'delegate';
import getData from 'game/data/get';
import editorState from 'state';
import gameState from 'game/state';
import draw from 'draw';
import { push } from 'navigation';
import { querySelector } from 'dom-util';
import updateActiveTab from 'update-tab';
import createData from 'data/create';

export default function initTreeTabEvents() {
	const tab = '#tree-tab';

	// toggle item collapse
	_editorDelegate(`${tab} li > div.content > span.text`, 'click', (e, t) => {
		const li = <HTMLLIElement>t.closest('li'); // dialogue or choice
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
	_editorDelegate(`${tab} li.dialogue > div.content > button.go-to`, 'click', (e, t) => {
		const id = +t.closest('li.dialogue').dataset.id;
		if (gameState.currentDialogueID === id) return;
		gameState.currentDialogueID = id;
		push(id);
		draw();
	});

	// highlight referenced dialogue
	_editorDelegate(`${tab} li.dialogue.reference > div.content > span.text`, 'mouseover', (e, t) => {
		const id = +t.closest('li.dialogue').dataset.id;
		// find original dialogue and highlight it
		const dEl = querySelector(`${tab} li.dialogue:not(.reference)[data-id="${id}"]`);
		dEl.classList.add('highlight');
	});
	_editorDelegate(`${tab} li.dialogue.reference > div.content > span.text`, 'mouseout', (e, t) => {
		// find any highlighted dialogue (should only be one) and un-higlhight it
		const dEl = querySelector(`${tab} li.dialogue:not(.reference).highlight`);
		dEl.classList.remove('highlight');
	});

	// dialogue link button
	_editorDelegate(`${tab} li.dialogue > div.content > button.link`, 'click', (e, t) => {
		if (editorState.tree.linking.finalized) resetLinkMemory();

		const id = +t.closest('li.dialogue').dataset.id;

		// link button acts as toggle
		if (editorState.tree.linking.dialogueID === id) {
			editorState.tree.linking.dialogueID = null;
		} else {
			editorState.tree.linking.dialogueID = id;
		}

		finalizeLink();
	});

	// choice link button
	_editorDelegate(`${tab} li.choice > div.content > button.link`, 'click', (e, t) => {
		if (editorState.tree.linking.finalized) resetLinkMemory();

		const choiceId = +t.closest('li.choice').dataset.id;
		const c = getData('choices', choiceId);

		if (editorState.tree.linking.choiceID === choiceId) {
			editorState.tree.linking.choiceID = null;
			editorState.tree.linking.srcDialogueID = null;
		} else {
			editorState.tree.linking.choiceID = choiceId;

			// if the choice has a target dialogue, remember it so that this link can be undone
			if (c.targetDialogueID !== null) editorState.tree.linking.srcDialogueID = c.targetDialogueID;
		}

		// TODO have a "cleanup" function that runs sometimes that removes orphaned dialogue

		finalizeLink();
	});

	function resetLinkMemory() {
		editorState.tree.linking.choiceID = null;
		editorState.tree.linking.dialogueID = null;
		editorState.tree.linking.srcDialogueID = null;
	}

	function finalizeLink() {
		// do nothing if choiceID and dialogueID are set
		if (editorState.tree.linking.choiceID === null || editorState.tree.linking.dialogueID === null) {
			editorState.tree.linking.finalized = false;
			updateActiveTab();
			return;
		}

		const c = getData('choices', editorState.tree.linking.choiceID);
		c.targetDialogueID = editorState.tree.linking.dialogueID;
		editorState.tree.linking.finalized = true;

		draw();
	}

	// undo link
	_editorDelegate(`${tab} > div > button.undo`, 'click', (e, t) => {
		const last = Object.assign({}, editorState.tree.linking);

		editorState.tree.linking.dialogueID = last.srcDialogueID;
		editorState.tree.linking.srcDialogueID = last.dialogueID;

		const c = getData('choices', last.choiceID);
		c.targetDialogueID = last.srcDialogueID;

		draw();
	});

	// unlink choice from its dialogue
	_editorDelegate(`${tab} li.choice > div.content > button.unlink`, 'click', (e, t) => {
		const id = +t.closest('li.choice').dataset.id;
		const c = getData('choices', id);
		c.targetDialogueID = null;
		draw();
	});

	// create dialogue from choice
	_editorDelegate(`${tab} li.choice > div.content > button.create-dialogue`, 'click', (e, t) => {
		const parentDialogueId = +t.closest('li.dialogue').dataset.id;
		const choiceId = +t.closest('li.choice').dataset.id;

		const parentDialogue = getData('dialogue', parentDialogueId);
		const thisChoice = getData('choices', choiceId);

		// use same background and character as parent dialogue by default
		const newD = createData.dialogue(parentDialogue.backgroundID, parentDialogue.characterID);
		thisChoice.targetDialogueID = newD.id;
		draw();
	});
}
