import { Dialogue } from 'game/types';
import lookupData from 'game/data/lookup';
import data from 'game/data';
import editorElements from 'editor-elements';
import { createElement } from 'dom-util';

export default function updateCharacter(d: Dialogue) {
	const c = lookupData.character(d.characterID);

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
