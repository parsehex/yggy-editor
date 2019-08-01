import * as morph from 'nanomorph';
import editorElements from 'editor-elements';
import data from 'game/data';
import { createElement } from 'dom-util';
import getImagesSelect from 'update-tab/common/images-select';

export default function updateCharactersTab() {
	const tmp = <HTMLDivElement>editorElements.charactersTab.list.cloneNode();
	const chars = data.characters;
	tmp.innerHTML = '';

	for (const c of chars) {
		const div = createElement('div');

		const inputName = createElement('input');
		inputName.className = 'name';
		inputName.type = 'text';
		inputName.dataset.id = c.id.toString();
		inputName.value = c.name;
		div.append(inputName);

		const imageSelect = getImagesSelect(c.id, c.imageID);
		div.append(imageSelect);

		if (chars.length > 1) {
			const btnDelete = createElement('button');
			btnDelete.className = 'delete';
			btnDelete.type = 'button';
			btnDelete.textContent = 'X';
			btnDelete.title = 'Delete character';
			btnDelete.dataset.id = c.id.toString();
			div.append(btnDelete);
		}

		tmp.append(div);
	}

	morph(editorElements.charactersTab.list, tmp);
}
