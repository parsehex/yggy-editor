import _editorDelegate from 'delegate';
import getData from 'game/data/get';
import draw from 'draw';
import { getFreeID } from 'id-service';
import data from 'game/data';
import updateActiveTab from 'update-tab';
import remove from 'data/remove';
import editorElements from 'editor-elements';

export default function initImagesTabEvents() {
	const tab = '#images-tab';

	// create image
	_editorDelegate(`${tab} button.create`, 'click', () => {
		const imgId = getFreeID('images');
		data.images.push({
			id: imgId,
			name: 'New Image',
			filename: '',
		});
		updateActiveTab();
	});

	// delete image
	_editorDelegate(`${tab} .list button.delete`, 'click', (e, t: HTMLButtonElement) => {
		const imgId = +t.closest('div.image').dataset.id;
		remove.image(imgId);
		draw();
	});

	// change image name
	_editorDelegate(`${tab} .list input.name`, 'input', (e, t: HTMLInputElement) => {
		const id = +t.closest('div.image').dataset.id;
		const img = getData('images', id);
		img.name = t.value;
		draw();
	});

	// change image file
	_editorDelegate(`${tab} .list select.image-file`, 'change', (e, t: HTMLSelectElement) => {
		const imgId = +t.closest('div.image').dataset.id;
		const img = getData('images', imgId);
		img.filename = t.value;
		draw();
	});

	// change preview image
	_editorDelegate(`${tab} select.image-file-preview-select`, 'change', (e, t: HTMLSelectElement) => {
		let val = t.value;
		if (val === 'none') {
			val = '';
		} else {
			val = '/assets/images/' + val;
		}
		editorElements.imagesTab.previewImage.src = val;
	});

	// upload image
	_editorDelegate(`${tab} #upload button.submit`, 'click', async () => {
		if (editorElements.imagesTab.fileInput.files.length === 0) {
			uploadError();
			return;
		}

		const file = editorElements.imagesTab.fileInput.files[0];
		let fileName = editorElements.imagesTab.uploadFileName.value;
		if (!fileName) fileName = file.name;
		if (fileName.indexOf('.png') === -1) fileName += '.png';

		const url = '/api/upload-image?filename=' + fileName;

		const r = await fetch(url, {
			method: 'POST',
			body: file.slice(),
		});
		if (r.status !== 200) {
			console.log(r);
			uploadError();
		} else {
			uploadSuccess();
		}
		updateActiveTab();
	});

	function uploadError() {
		// TODO not very descriptive
		editorElements.imagesTab.uploadButton.classList.add('error');
		editorElements.imagesTab.uploadButton.disabled = true;

		setTimeout(() => {
			editorElements.imagesTab.uploadButton.classList.remove('error');
			editorElements.imagesTab.uploadButton.disabled = false;
		}, 1500);
	}
	function uploadSuccess() {
		editorElements.imagesTab.uploadButton.classList.add('success');
		editorElements.imagesTab.uploadButton.disabled = true;

		setTimeout(() => {
			editorElements.imagesTab.uploadButton.classList.remove('success');
			editorElements.imagesTab.uploadButton.disabled = false;
		}, 1500);
	}
}
