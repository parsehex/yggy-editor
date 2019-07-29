import data from '../../src/data';
import state from '../../src/state';
import { disabled } from './dom-util';
import editorState from './state';
import lookup from '../../src/lookup';

const btnBack = <HTMLButtonElement>document.getElementById('nav-back');
const btnNext = <HTMLButtonElement>document.getElementById('nav-next');
const dialogue = <HTMLTextAreaElement>document.getElementById('dialogue');
const choices = <HTMLDivElement>document.getElementById('choices');

export default function update() {
	const d = lookup.dialogue(state.currentDialogueID);

	dialogue.value = d.text;
	updateChoices(d.choices);

	// update history buttons
	disabled(btnBack, editorState.currentHistoryIndex === 0);
	disabled(btnNext, editorState.currentHistoryIndex === editorState.history.length - 1);
}

function updateChoices(c: number[]) {
	choices.innerHTML = '';

	for (const id of c) {
		const choice = lookup.choice(id);

		const div = document.createElement('div');

		const textarea = document.createElement('textarea');
		textarea.className = 'choice';
		textarea.cols = 30;
		textarea.placeholder = 'Choice text';
		textarea.value = choice.text;
		textarea.dataset.id = choice.id.toString();
		div.append(textarea);

		const btnDelete = document.createElement('button');
		btnDelete.className = 'delete';
		btnDelete.type = 'button';
		btnDelete.textContent = 'X';
		btnDelete.dataset.id = choice.id.toString();
		btnDelete.title = 'Delete choice';
		div.append(btnDelete);

		choices.append(div);
	}

	const divAdd = document.createElement('div');

	const btnAdd = document.createElement('button');
	btnAdd.className = 'add';
	btnAdd.type = 'button';
	btnAdd.textContent = '+';
	btnAdd.title = 'Add choice';
	divAdd.append(btnAdd);

	choices.append(divAdd);
}
