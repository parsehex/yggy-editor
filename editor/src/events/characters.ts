import _editorDelegate from 'delegate';
import getData from 'game/data/get';
import draw from 'draw';
import updateActiveTab from 'update-tab';
import remove from 'data/remove';
import createData from 'data/create';

export default function initCharactersTabEvents() {
	// create character
	_editorDelegate('#characters-tab div.character > button.create', 'click', () => {
		createData.character();
		updateActiveTab();
	});

	// delete character
	_editorDelegate('#characters-tab div.character > button.delete', 'click', (e, t: HTMLButtonElement) => {
		const div = <HTMLDivElement>t.closest('div.character');
		const id = +div.dataset.id;
		remove.character(id);
		draw();
	});

	// change character name
	_editorDelegate('#characters-tab div.character > input.name', 'input', (e, t: HTMLInputElement) => {
		const div = <HTMLDivElement>t.closest('div.character');
		const id = +div.dataset.id;
		const ch = getData('characters', id);
		ch.name = t.value;
		draw();
	});

	// create frame
	_editorDelegate('#characters-tab div.frame > button.create', 'click', (e, t) => {
		const charDiv = <HTMLDivElement>t.closest('div.character');
		const charId = +charDiv.dataset.id;
		const ch = getData('characters', charId);
		const f = createData.frame('New frame');
		ch.frames.push(f.id);
		draw();
	});

	// change frame image
	_editorDelegate('#characters-tab div.frame > select.image', 'change', (e, t: HTMLSelectElement) => {
		const fDiv = <HTMLDivElement>t.closest('div.frame');
		const fId = +fDiv.dataset.id;
		const imgId = +t.value;
		const f = getData('frames', fId);
		f.imageID = imgId;
		draw();
	});

	// delete frame
	_editorDelegate('#characters-tab div.frame > button.delete', 'click', (e, t: HTMLButtonElement) => {
		const div = <HTMLDivElement>t.closest('div.frame');
		const id = +div.dataset.id;
		remove.frame(id);
		draw();
	});
}
