import * as morph from 'nanomorph';
import editorElements from 'editor-elements';
import data from 'game/data';
import { createElement } from 'dom-util';
import createSelect, { SelectOptions } from 'update-tab/common/select';
import createButton from 'update-tab/common/button';

export default async function updateImagesTab() {
	const r = await fetch('/api/get-images');
	const imageFiles: string[] = await r.json();

	const tmp = <HTMLDivElement>editorElements.imagesTab.list.cloneNode();
	const imgs = data.images;
	tmp.innerHTML = '';

	const fileOptions: SelectOptions = imageFiles.map(f => ({ text: f }));

	for (const img of imgs) {
		const div = createElement('div');
		div.className = 'image';
		div.dataset.id = img.id.toString();

		const preview = createElement('img');
		preview.className = 'image-preview';
		preview.src = '/game-data/images/' + img.filename;
		div.append(preview);

		const inputName = createElement('input');
		inputName.className = 'name';
		inputName.type = 'text';
		inputName.value = img.name;
		div.append(inputName);

		const fileSelect = createSelect('image-file', fileOptions, img.filename);
		div.append(fileSelect);

		if (imgs.length > 1) {
			const btnDelete = createButton('delete', 'X');
			btnDelete.title = 'Delete image';
			div.append(btnDelete);
		}

		tmp.append(div);
	}

	const oldPreviewVal = editorElements.imagesTab.previewSelect.value || 'none';

	fileOptions.unshift({ text: 'None' });
	const previewSelect = createSelect('image-file-preview-select', fileOptions);

	editorElements.imagesTab.previewSelect.replaceWith(previewSelect);

	if (imageFiles.indexOf(oldPreviewVal) > -1) {
		previewSelect.value = oldPreviewVal;
	} else {
		previewSelect.value = 'none';
	}

	morph(editorElements.imagesTab.list, tmp);
}
