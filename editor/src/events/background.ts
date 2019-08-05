import _editorDelegate from 'delegate';
import getData from 'game/data/get';
import draw from 'draw';
import { getFreeID } from 'id-service';
import data from 'game/data';
import updateActiveTab from 'update-tab';
import remove from 'data/remove';

export default function initBackgroundsTabEvents() {
	const tab = '#backgrounds-tab';

	// create background
	_editorDelegate(`${tab} button.create`, 'click', () => {
		const bgId = getFreeID('backgrounds');
		data.backgrounds.push({
			id: bgId,
			name: 'New Background',
			imageID: data.images[0].id,
			bgColor: '#FFFFFF',
		});
		updateActiveTab();
	});

	// delete background
	_editorDelegate(`${tab} .list button.delete`, 'click', (e, t) => {
		const bgId = +t.closest('div.background').dataset.id;
		remove.background(bgId);
		document.body.dataset
		draw();
	});

	// change background name
	_editorDelegate(`${tab} .list input.name`, 'input', (e, t: HTMLInputElement) => {
		const id = +t.closest('div.background').dataset.id;
		const bg = getData('backgrounds', id);
		bg.name = t.value;
		draw();
	});

	// change background color
	_editorDelegate(`${tab} .list input.bg-color`, 'change', (e, t: HTMLInputElement) => {
		const id = +t.closest('div.background').dataset.id;
		const bg = getData('backgrounds', id);
		let val = t.value;
		if (val.indexOf('#') === -1) val = '#' + val;
		bg.bgColor = val;
		draw();
	});

	// change background image
	_editorDelegate(`${tab} .list select.image`, 'change', (e, t: HTMLSelectElement) => {
		const bgId = +t.closest('div.background').dataset.id;
		const imgId = +t.value;
		const bg = getData('backgrounds', bgId);
		bg.imageID = imgId;
		draw();
	});
}
