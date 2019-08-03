import _editorDelegate from 'delegate';
import getData from 'game/data/get';
import draw from 'draw';
import updateActiveTab from 'update-tab';
import remove from 'data/remove';
import createData from 'data/create';

export default function initCharactersTabEvents() {
	const tab = '#characters-tab';

	// create character
	_editorDelegate(`${tab} div.character > button.create`, 'click', () => {
		createData.character();
		updateActiveTab();
	});

	// delete character
	_editorDelegate(`${tab} div.character > button.delete`, 'click', (e, t: HTMLButtonElement) => {
		const id = +t.closest('div.character').dataset.id;
		remove.character(id);
		draw();
	});

	// change character name
	_editorDelegate(`${tab} div.character > input.name`, 'input', (e, t: HTMLInputElement) => {
		const id = +t.closest('div.character').dataset.id;
		const ch = getData('characters', id);
		ch.name = t.value;
		draw();
	});

	// create frame
	_editorDelegate(`${tab} div.frame > button.create`, 'click', (e, t) => {
		const charId = +t.closest('div.character').dataset.id;
		const ch = getData('characters', charId);
		const f = createData.frame('New frame');
		ch.frames.push(f.id);
		draw();
	});

	// change frame image
	_editorDelegate(`${tab} div.frame > select.image`, 'change', (e, t: HTMLSelectElement) => {
		const fId = +t.closest('div.frame').dataset.id;
		const imgId = +t.value;
		const f = getData('frames', fId);
		f.imageID = imgId;
		draw();
	});

	// delete frame
	_editorDelegate(`${tab} div.frame > button.delete`, 'click', (e, t: HTMLButtonElement) => {
		const id = +t.closest('div.frame').dataset.id;
		remove.frame(id);
		draw();
	});
}
