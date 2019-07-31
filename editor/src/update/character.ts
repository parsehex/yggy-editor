import { Dialogue } from 'game/types';
import lookupData from 'game/data/lookup';
import data from 'game/data';
import editorElements from 'editor-elements';

export default function updateCharacter(d: Dialogue) {
	const c = lookupData.character(d.characterID);

	editorElements.character.innerHTML = '';
	const chars = data.characters;
	for (const char of chars) {
		const option = document.createElement('option');
		option.value = char.id.toString();
		option.textContent = char.name;
		editorElements.character.append(option);
	}
	editorElements.character.value = c.id.toString();
}
