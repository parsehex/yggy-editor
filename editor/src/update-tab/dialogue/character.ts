import { Dialogue } from 'game/types';
import getData from 'game/data/get';
import data from 'game/data';
import editorElements from 'editor-elements';
import { createElement } from 'dom-util';

export default function updateCharacter(d: Dialogue) {
	const c = getData('characters', d.characterID);

	editorElements.dialogueTab.character.innerHTML = '';
	const chars = data.characters;
	for (const char of chars) {
		const option = createElement('option');
		option.value = char.id.toString();
		option.textContent = char.name;
		editorElements.dialogueTab.character.append(option);
	}
	editorElements.dialogueTab.character.value = c.id.toString();
}
