import _editorDelegate from 'delegate';
import lookupData from 'game/data/lookup';
import editorState from 'state';
import gameState from 'game/state';
import draw from 'draw';
import { push } from 'navigation';
import { querySelector } from 'dom-util';
import updateActiveTab from 'update-tab';
import createData from 'data/create';

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

	// dialogue link button
	_editorDelegate('#tree-tab li.dialogue > button.link', 'click', (e, t) => {
		if (editorState.tree.linking.finalized) resetLinkMemory();

		const li = <HTMLLIElement>t.closest('li');
		const id = +li.dataset.id;

		// link button acts as toggle
		if (editorState.tree.linking.dialogueID === id) {
			editorState.tree.linking.dialogueID = null;
		} else {
			editorState.tree.linking.dialogueID = id;
		}

		finalizeLink();
	});

	// choice link button
	_editorDelegate('#tree-tab li.choice > button.link', 'click', (e, t) => {
		if (editorState.tree.linking.finalized) resetLinkMemory();

		const li = <HTMLLIElement>t.closest('li');
		const choiceId = +li.dataset.id;
		const c = lookupData.choice(choiceId);

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

		const c = lookupData.choice(editorState.tree.linking.choiceID);
		c.targetDialogueID = editorState.tree.linking.dialogueID;
		editorState.tree.linking.finalized = true;

		draw();
	}

	// undo link
	_editorDelegate('#tree-tab > div > button.undo', 'click', (e, t) => {
		const last = Object.assign({}, editorState.tree.linking);

		editorState.tree.linking.dialogueID = last.srcDialogueID;
		editorState.tree.linking.srcDialogueID = last.dialogueID;

		const c = lookupData.choice(last.choiceID);
		c.targetDialogueID = last.srcDialogueID;

		draw();
	});

	// unlink choice from its dialogue
	_editorDelegate('#tree-tab li.choice > button.unlink', 'click', (e, t) => {
		const li = <HTMLLIElement>t.closest('li');
		const id = +li.dataset.id;
		const c = lookupData.choice(id);
		c.targetDialogueID = null;
		draw();
	});

	// create dialogue from choice
	_editorDelegate('#tree-tab li.choice > button.create-dialogue', 'click', (e, t) => {
		const dialogueLi = <HTMLLIElement>t.closest('li.dialogue');
		const parentDialogueId = +dialogueLi.dataset.id;
		const choiceLi = <HTMLLIElement>t.closest('li.choice');
		const choiceId = +choiceLi.dataset.id;

		const parentDialogue = lookupData.dialogue(parentDialogueId);
		const thisChoice = lookupData.choice(choiceId);

		// use same background and character as parent dialogue by default
		const newD = createData.dialogue(parentDialogue.backgroundID, parentDialogue.characterID);
		thisChoice.targetDialogueID = newD.id;
		draw();
	});
}
