import * as morph from 'nanomorph';
import editorElements from 'editor-elements';
import data from 'game/data';
import { createElement } from 'dom-util';

export default async function updateImagesTab() {
	const r = await fetch('/api/get-images');
	const imageList: string[] = await r.json();

	const tmp = <HTMLDivElement>editorElements.imagesTab.list.cloneNode();
	const imgs = data.images;
	tmp.innerHTML = '';

	for (const img of imgs) {
		const div = createElement('div');

		const preview = createElement('img');
		preview.className = 'image-preview';
		preview.src = '/assets/images/' + img.filename;
		div.append(preview);

		const inputName = createElement('input');
		inputName.className = 'name';
		inputName.type = 'text';
		inputName.dataset.id = img.id.toString();
		inputName.value = img.name;
		div.append(inputName);

		const fileSelect = imageFileSelect(imageList, img.id, img.filename);
		div.append(fileSelect);

		if (imgs.length > 1) {
			const btnDelete = createElement('button');
			btnDelete.className = 'delete';
			btnDelete.type = 'button';
			btnDelete.textContent = 'X';
			btnDelete.title = 'Delete image';
			btnDelete.dataset.id = img.id.toString();
			div.append(btnDelete);
		}

		tmp.append(div);
	}

	const oldPreviewVal = editorElements.imagesTab.previewSelect.value;
	editorElements.imagesTab.previewSelect.innerHTML = '';

	const noneOption = createElement('option');
	noneOption.value = 'None';
	noneOption.textContent = 'None';
	editorElements.imagesTab.previewSelect.append(noneOption);

	for (const i of imageList) {
		const option = createElement('option');
		option.value = i;
		option.textContent = i;
		editorElements.imagesTab.previewSelect.append(option);
	}

	if (imageList.indexOf(oldPreviewVal) > -1) {
		editorElements.imagesTab.previewSelect.value = oldPreviewVal;
	} else {
		editorElements.imagesTab.previewSelect.value = 'None';
	}

	morph(editorElements.imagesTab.list, tmp);
}

function imageFileSelect(images: string[], datasetID: number, initialValue?: string) {
	const select = createElement('select');
	select.className = 'image-file';
	select.dataset.id = datasetID.toString();

	for (const img of images) {
		const option = createElement('option');
		option.value = img;
		option.textContent = img;
		select.append(option);
	}

	if (initialValue !== undefined) select.value = initialValue;
	return select;
}
