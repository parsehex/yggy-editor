import * as morph from 'nanomorph';
import editorElements from 'editor-elements';
import data from 'game/data';
import { createElement } from 'dom-util';
import select from 'update-tab/common/select';

export default function updateBackgroundsTab() {
	const tmp = <HTMLDivElement>editorElements.backgroundsTab.list.cloneNode();
	const bgs = data.backgrounds;
	tmp.innerHTML = '';

	const imageOptions = data.images.map(i => ({ text: i.name, value: i.id.toString() }));

	for (const b of bgs) {
		const div = createElement('div');

		const inputName = createElement('input');
		inputName.className = 'name';
		inputName.type = 'text';
		inputName.dataset.id = b.id.toString();
		inputName.value = b.name;
		div.append(inputName);

		const imageSelect = select('image', b.id, imageOptions, b.imageID);
		div.append(imageSelect);

		const bgColor = createElement('input');
		bgColor.className = 'bg-color';
		bgColor.type = 'text';
		bgColor.dataset.id = b.id.toString();
		bgColor.value = b.bgColor;
		bgColor.title = 'Color of the background behind image';
		div.append(bgColor);

		if (bgs.length > 1) {
			const btnDelete = createElement('button');
			btnDelete.className = 'delete';
			btnDelete.type = 'button';
			btnDelete.textContent = 'X';
			btnDelete.title = 'Delete background';
			btnDelete.dataset.id = b.id.toString();
			div.append(btnDelete);
		}

		tmp.append(div);
	}

	morph(editorElements.backgroundsTab.list, tmp);
}
