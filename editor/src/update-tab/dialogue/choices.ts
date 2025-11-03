import editorElements from 'editor-elements';
import getData from 'game/data/get';
import { Dialogue } from 'game/types';
import morph from 'nanomorph';
import { createElement } from 'dom-util';

export default function updateChoices(d: Dialogue) {
	const tmp = <HTMLDivElement>editorElements.dialogueTab.choices.cloneNode();
	const { choices } = d;
	tmp.innerHTML = '';

	for (const id of choices) {
		const c = getData('choices', id);

		const div = createElement('div');
		div.className = 'choice';
		div.dataset.id = id.toString();

		const textarea = createElement('textarea');
		textarea.className = 'text';
		textarea.cols = 30;
		textarea.placeholder = 'Choice text';
		textarea.value = c.text;
		div.append(textarea);

		const btnDelete = createElement('button');
		btnDelete.className = 'delete';
		btnDelete.type = 'button';
		btnDelete.textContent = 'X';
		btnDelete.title = 'Delete choice';
		div.append(btnDelete);

		if (c.targetDialogueID === null) {
			const btnNewDialogue = createElement('button');
			btnNewDialogue.className = 'create-dialogue';
			btnNewDialogue.type = 'button';
			btnNewDialogue.textContent = '+ Dialogue';
			btnNewDialogue.title = 'Attach a new dialogue to this choice';
			div.append(btnNewDialogue);
		} else {
			const btnGoToDialogue = createElement('button');
			btnGoToDialogue.className = 'go-to-dialogue';
			btnGoToDialogue.type = 'button';
			btnGoToDialogue.textContent = 'Go';
			btnGoToDialogue.title = 'Go to linked dialogue';
			div.append(btnGoToDialogue);
		}

		tmp.append(div);
	}

	const divAdd = createElement('div');

	const btnAdd = createElement('button');
	btnAdd.className = 'create';
	btnAdd.type = 'button';
	btnAdd.textContent = '+ Choice';
	btnAdd.title = 'Add choice';
	divAdd.append(btnAdd);

	tmp.append(divAdd);

	morph(editorElements.dialogueTab.choices, tmp);
}
