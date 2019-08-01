import _editorDelegate from 'delegate';
import lookupData from 'game/data/lookup';
import draw from 'draw';
import { getFreeID } from 'id-service';
import data from 'game/data';
import updateActiveTab from 'update-tab';
import remove from 'data/remove';

export default function initCharactersTabEvents() {
	// create character
	_editorDelegate('#characters-tab button.create', 'click', () => {
		const charId = getFreeID('characters');
		data.characters.push({
			id: charId,
			name: 'New Character',
			imageID: data.images[0].id, // ID of default character image
		});
		updateActiveTab();
	});

	// delete character
	_editorDelegate('#characters-tab .list button.delete', 'click', (e, t: HTMLButtonElement) => {
		const charId = +t.dataset.id;
		remove.character(charId);
		draw();
	});

	// change character name
	_editorDelegate('#characters-tab .list input.name', 'input', (e, t: HTMLInputElement) => {
		const id = +t.dataset.id;
		const ch = lookupData.character(id);
		ch.name = t.value;
		draw();
	});

	// change character image
	_editorDelegate('#characters-tab .list select.image', 'change', (e, t: HTMLSelectElement) => {
		const charId = +t.dataset.id;
		const imgId = +t.value;
		const char = lookupData.character(charId);
		char.imageID = imgId;
		draw();
	});
}
