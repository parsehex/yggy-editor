import { Dialogue } from 'game/types';
import data from 'game/data';
import * as morph from 'nanomorph';
import editorElements from 'editor-elements';
import { createElement, querySelector } from 'dom-util';
import lookupData from 'game/data/lookup';
import gameState from 'game/state';
import editorState from 'state';

let tmp: HTMLUListElement;
export default function updateTreeTab() {
	tmp = <HTMLUListElement>editorElements.tree.cloneNode();

	// TODO need a way to set certain dialogue as "first"
	const d = data.dialogue[0];
	makeDialogueBranch(d, tmp);
	morph(editorElements.tree, tmp);
}

const title = 'Click to toggle collapse';
let i = 0;
function makeDialogueBranch(d: Dialogue, target: HTMLUListElement) {
	if (i++ > 5000) return;

	// if dialogue has already been drawn then draw every new instance as shallow
	const isReference = !!tmp.querySelector(`li.dialogue[data-id="${d.id}"]`);

	const li = createElement('li');
	li.className = 'dialogue' + (isReference ? ' reference' : '');
	li.dataset.id = d.id.toString();
	if (gameState.currentDialogueID === d.id && !isReference) li.classList.add('active');
	if (editorState.tree.collapsed.dialogue.indexOf(d.id) > -1) li.classList.add('collapsed');
	target.append(li);

	const dialogueSpan = createElement('span');
	dialogueSpan.className = 'text';
	dialogueSpan.textContent = d.text;
	dialogueSpan.title = title;
	li.append(dialogueSpan);

	const c = lookupData.character(d.characterID);
	const charSpan = createElement('span');
	charSpan.className = 'character';
	charSpan.textContent = c.name;
	li.append(charSpan);

	// end branch on references
	if (isReference) return;

	const btnGo = createElement('button');
	btnGo.className = 'go-to';
	btnGo.type = 'button';
	btnGo.title = 'Go to dialogue in preview';
	btnGo.textContent = 'Go';
	li.append(btnGo);

	// end branch if there are no choices
	if (d.choices.length === 0) return;

	const choicesUl = createElement('ul');
	choicesUl.className = 'choices';
	li.append(choicesUl);

	for (const cId of d.choices) {
		const c = lookupData.choice(cId);

		const choiceLi = createElement('li');
		choiceLi.className = 'choice';
		choiceLi.dataset.id = cId.toString();
		if (editorState.tree.collapsed.choices.indexOf(c.id) > -1) choiceLi.classList.add('collapsed');
		choicesUl.append(choiceLi);

		const textSpan = createElement('span');
		textSpan.className = 'text';
		textSpan.textContent = c.text;
		textSpan.title = title;
		choiceLi.append(textSpan);

		// end choice-branch if choice doesn't point to a dialogue
		if (c.targetDialogueID === null) continue;

		const cd = lookupData.dialogue(c.targetDialogueID);
		const dUl = createElement('ul');
		choiceLi.append(dUl);
		makeDialogueBranch(cd, dUl);
	}
}

// function makeDialogueItem(d: Dialogue) {
// 	// if this dialogue has already been drawn then don't recursively draw it
// 	if (!tmp.querySelector(`li.dialogue[data-id="${cd.id}"]`)) {
// 		const dUl = createElement('ul');
// 		choiceLi.append(dUl);
// 		makeDialogueBranch(cd, dUl);
// 	} else {
// 		// create just a single line denoting a reference
// 		const dUl = createElement('ul');
// 		choiceLi.append(dUl);

// 		const dLi = createElement('li');
// 		dLi.className = 'dialogue reference';
// 		dLi.dataset.id = cd.id.toString();
// 		dUl.append(dLi);

// 		console.log(gameState.currentDialogueID, cd);

// 		// TODO why is this activating on some other random dialogue?
// 		if (gameState.currentDialogueID === cd.id) li.classList.add('active');

// 		const dSpan = createElement('span');
// 		dSpan.textContent = cd.text;
// 		dSpan.className = 'text';
// 		dLi.append(dSpan);
// 	}
// }

// function makeChoicesList() {
// 	// 
// }
