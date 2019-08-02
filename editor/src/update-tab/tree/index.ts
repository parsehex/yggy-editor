import { Dialogue } from 'game/types';
import data from 'game/data';
import * as morph from 'nanomorph';
import editorElements from 'editor-elements';
import { createElement, querySelector, disabled } from 'dom-util';
import lookupData from 'game/data/lookup';
import gameState from 'game/state';
import editorState from 'state';

let tmp: HTMLUListElement;
export default function updateTreeTab() {
	tmp = <HTMLUListElement>editorElements.tree.list.cloneNode();

	// TODO need a way to set certain dialogue as "first"
	const d = data.dialogue[0];
	makeDialogueBranch(d, tmp);
	morph(editorElements.tree.list, tmp);

	// enable undo only if finalized and dialogue/choice ids are set
	disabled(editorElements.tree.btnUndo, (
		!editorState.tree.linking.finalized ||
		editorState.tree.linking.dialogueID === null ||
		editorState.tree.linking.choiceID === null
	));
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

	const ch = lookupData.character(d.characterID);
	const charSpan = createElement('span');
	charSpan.className = 'character';
	charSpan.textContent = ch.name;
	li.append(charSpan);

	// end branch on references
	if (isReference) return;

	const btnGo = createElement('button');
	btnGo.className = 'go-to';
	btnGo.type = 'button';
	btnGo.title = 'Go to dialogue in preview';
	btnGo.textContent = 'Go';
	li.append(btnGo);

	const btnLink = createElement('button');
	btnLink.className = 'link';
	btnLink.type = 'button';
	btnLink.title = 'Link dialogue to choice';
	btnLink.textContent = 'Link';
	// don't highlight button if link is already finalized
	if (!editorState.tree.linking.finalized && editorState.tree.linking.dialogueID === d.id) {
		btnLink.classList.add('active');
	}
	li.append(btnLink);

	// end branch if there are no choices
	if (d.choices.length === 0) return;

	const choicesUl = createElement('ul');
	choicesUl.className = 'choices';
	li.append(choicesUl);

	for (const cId of d.choices) {
		const c = lookupData.choice(cId);
		const cText = c.text.length > 0 ? c.text : '(cycle dialogue)';

		const choiceLi = createElement('li');
		choiceLi.className = 'choice';
		choiceLi.dataset.id = cId.toString();
		if (editorState.tree.collapsed.choices.indexOf(c.id) > -1) choiceLi.classList.add('collapsed');
		if (c.text.length === 0) choiceLi.classList.add('cycle-dialogue');
		choicesUl.append(choiceLi);

		const textSpan = createElement('span');
		textSpan.className = 'text';
		textSpan.textContent = cText;
		textSpan.title = title;
		choiceLi.append(textSpan);

		const choiceBtnLink = createElement('button');
		choiceBtnLink.className = 'link';
		choiceBtnLink.type = 'button';
		choiceBtnLink.title = 'Link choice to dialogue';
		choiceBtnLink.textContent = 'Link';
		if (!editorState.tree.linking.finalized && editorState.tree.linking.choiceID === c.id) {
			choiceBtnLink.classList.add('active');
		}
		choiceLi.append(choiceBtnLink);

		const choiceBtnUnlink = createElement('button');
		choiceBtnUnlink.className = 'unlink';
		choiceBtnUnlink.type = 'button';
		choiceBtnUnlink.title = 'Remove dialogue link';
		choiceBtnUnlink.textContent = 'Unlink';
		choiceLi.append(choiceBtnUnlink);

		// end choice-branch if choice doesn't point to a dialogue
		if (c.targetDialogueID === null) continue;

		const cd = lookupData.dialogue(c.targetDialogueID);
		const dUl = createElement('ul');
		choiceLi.append(dUl);
		makeDialogueBranch(cd, dUl);
	}
}
