import editorElements from 'editor-elements';
import getData from 'game/data/get';
import { Dialogue } from 'game/types';
import * as morph from 'nanomorph';
import { createElement } from 'dom-util';

const tmp = <HTMLDivElement>editorElements.dialogueTab.choices.cloneNode();
export default function updateChoices(d: Dialogue) {
	const { choices } = d;
	tmp.innerHTML = '';

	for (const id of choices) {
		const c = getData('choices', id);

		const div = createElement('div');

		const textarea = createElement('textarea');
		textarea.className = 'choice';
		textarea.cols = 30;
		textarea.placeholder = 'Choice text';
		textarea.value = c.text;
		textarea.dataset.id = c.id.toString();
		div.append(textarea);

		const btnDelete = createElement('button');
		btnDelete.className = 'delete';
		btnDelete.type = 'button';
		btnDelete.textContent = 'X';
		btnDelete.dataset.id = c.id.toString();
		btnDelete.title = 'Delete choice';
		div.append(btnDelete);

		if (c.targetDialogueID === null) {
			const btnNewDialogue = createElement('button');
			btnNewDialogue.className = 'create-dialogue';
			btnNewDialogue.type = 'button';
			btnNewDialogue.textContent = 'Create dialogue';
			btnNewDialogue.dataset.id = c.id.toString();
			div.append(btnNewDialogue);
		}

		tmp.append(div);
	}

	const divAdd = createElement('div');

	const btnAdd = createElement('button');
	btnAdd.className = 'add';
	btnAdd.type = 'button';
	btnAdd.textContent = '+ Choice';
	btnAdd.title = 'Add choice';
	divAdd.append(btnAdd);

	tmp.append(divAdd);

	morph(editorElements.dialogueTab.choices, tmp);
}
