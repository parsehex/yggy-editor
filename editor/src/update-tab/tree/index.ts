import { Dialogue } from 'game/types';
import data from 'game/data';
import * as morph from 'nanomorph';
import editorElements from 'editor-elements';
import { createElement, disabled } from 'dom-util';
import getData from 'game/data/get';
import gameState from 'game/state';
import editorState from 'state';
import createButton from 'update-tab/common/button';

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

	const contentDiv = createElement('div');
	contentDiv.className = 'content';
	li.append(contentDiv);

	const dialogueSpan = createElement('span');
	dialogueSpan.className = 'text';
	dialogueSpan.textContent = d.text;
	dialogueSpan.title = title;
	contentDiv.append(dialogueSpan);

	const ch = getData('characters', d.characterID);
	const charSpan = createElement('span');
	charSpan.className = 'character';
	charSpan.textContent = ch.name;
	contentDiv.append(charSpan);

	// end branch on references
	if (isReference) return;

	const btnGo = createButton('go-to', 'Go');
	btnGo.title = 'Go to dialogue in preview';
	contentDiv.append(btnGo);

	const btnLink = createButton('link', 'Link');
	btnLink.title = 'Link dialogue to choice';
	// don't highlight button if link is already finalized
	if (!editorState.tree.linking.finalized && editorState.tree.linking.dialogueID === d.id) {
		btnLink.classList.add('active');
	}
	contentDiv.append(btnLink);

	// end branch if there are no choices
	// TODO remove if we use the "+ Choice" buttons
	if (d.choices.length === 0) return;

	const choicesUl = createElement('ul');
	choicesUl.className = 'choices';
	li.append(choicesUl);

	// let isCycleDialogue = false;
	for (const cId of d.choices) {
		const c = getData('choices', cId);
		const cText = c.text.length > 0 ? c.text : '(cycle dialogue)';

		const choiceLi = createElement('li');
		choiceLi.className = 'choice';
		choiceLi.dataset.id = cId.toString();
		if (editorState.tree.collapsed.choices.indexOf(c.id) > -1) choiceLi.classList.add('collapsed');
		if (c.text.length === 0) {
			// isCycleDialogue = true;
			choiceLi.classList.add('cycle-dialogue');
		}
		choicesUl.append(choiceLi);

		const choiceContentDiv = createElement('div');
		choiceContentDiv.className = 'content';
		choiceLi.append(choiceContentDiv);

		const textSpan = createElement('span');
		textSpan.className = 'text';
		textSpan.textContent = cText;
		textSpan.title = title;
		choiceContentDiv.append(textSpan);

		const choiceBtnLink = createButton('link', 'Link');
		choiceBtnLink.title = 'Link choice to dialogue';
		if (!editorState.tree.linking.finalized && editorState.tree.linking.choiceID === c.id) {
			choiceBtnLink.classList.add('active');
		}
		choiceContentDiv.append(choiceBtnLink);

		// end choice-branch if choice doesn't point to a dialogue
		if (c.targetDialogueID === null) {
			const choiceBtnCreateDialogue = createButton('create-dialogue', '+ Dialogue');
			choiceContentDiv.append(choiceBtnCreateDialogue);
			continue;
		} else {
			const choiceBtnUnlink = createButton('unlink', 'Unlink');
			choiceBtnUnlink.title = 'Remove dialogue link';
			choiceContentDiv.append(choiceBtnUnlink);
		}

		const cd = getData('dialogue', c.targetDialogueID);
		const dUl = createElement('ul');
		choiceLi.append(dUl);
		makeDialogueBranch(cd, dUl);
	}

	// if (!isCycleDialogue) {
	// 	const btnCreateChoice = createButton('create-choice', '+ Choice');
	// 	btnCreateChoice.textContent = '+ Choice';
	// 	choicesUl.append(btnCreateChoice);
	// }
}
