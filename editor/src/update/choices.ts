import editorElements from 'editor-elements';
import lookupData from 'game/data/lookup';
import { Dialogue } from 'game/types';

export default function updateChoices(d: Dialogue) {
	const c = d.choices;
	editorElements.choices.innerHTML = '';

	for (const id of c) {
		const choice = lookupData.choice(id);

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

		editorElements.choices.append(div);
	}

	const divAdd = document.createElement('div');

	const btnAdd = document.createElement('button');
	btnAdd.className = 'add';
	btnAdd.type = 'button';
	btnAdd.textContent = '+';
	btnAdd.title = 'Add choice';
	divAdd.append(btnAdd);

	editorElements.choices.append(divAdd);
}
