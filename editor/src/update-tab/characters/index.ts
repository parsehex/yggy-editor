import morph from 'nanomorph';
import editorElements from 'editor-elements';
import data from 'game/data';
import { createElement } from 'dom-util';
import createSelect from 'update-tab/common/select';
import getData from 'game/data/get';

export default function updateCharactersTab() {
	const tmp = <HTMLDivElement>editorElements.charactersTab.list.cloneNode();
	const chars = data.characters;
	tmp.innerHTML = '';

	const imageOptions = data.images.map(i => ({ text: i.name, value: i.id.toString() }));

	for (const ch of chars) {
		const div = createElement('div');
		div.className = 'character';
		div.dataset.id = ch.id.toString();
		tmp.append(div);

		const inputName = createElement('input');
		inputName.className = 'name';
		inputName.type = 'text';
		inputName.value = ch.name;
		div.append(inputName);

		if (chars.length > 1) {
			const btnDelete = createElement('button');
			btnDelete.className = 'delete';
			btnDelete.type = 'button';
			btnDelete.textContent = 'X';
			btnDelete.title = 'Delete character';
			div.append(btnDelete);
		}

		// TODO add checkbox to make character "default"

		for (let i = 0; i < ch.frames.length; i++) {
			const fid = ch.frames[i];
			const f = getData('frames', fid);

			const fDiv = createElement('div');
			fDiv.className = 'frame';
			fDiv.dataset.id = f.id.toString();
			div.append(fDiv);

			let frameName: HTMLElement;
			if (i === 0) {
				// dont allow renaming default frame
				frameName = createElement('span');
				frameName.textContent = f.name; // ehh
			} else {
				frameName = createElement('input');
				const input = <HTMLInputElement>frameName; // sorry
				input.type = 'text';
				input.value = f.name;
				input.placeholder = 'Frame name';
			}
			frameName.className = 'name';
			fDiv.append(frameName);

			const imageSelect = createSelect('image', imageOptions, f.imageID);
			fDiv.append(imageSelect);

			// skip delete button on default frame
			if (i === 0) continue;

			const btnDelete = createElement('button');
			btnDelete.className = 'delete';
			btnDelete.type = 'button';
			btnDelete.textContent = 'X';
			fDiv.append(btnDelete);
		}

		const addFrameDiv = createElement('div');
		addFrameDiv.className = 'frame';
		div.append(addFrameDiv);

		const btnAdd = createElement('button');
		btnAdd.className = 'create';
		btnAdd.type = 'button';
		btnAdd.textContent = '+ Frame';
		addFrameDiv.append(btnAdd);
	}

	morph(editorElements.charactersTab.list, tmp);
}
