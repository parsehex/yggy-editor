import { Dialogue } from 'game/types';
import lookupData from 'game/data/lookup';
import data from 'game/data';
import editorElements from 'editor-elements';
import { createElement } from 'dom-util';

export default function updateBackground(d: Dialogue) {
	const bg = lookupData.background(d.backgroundID);

	editorElements.dialogueTab.background.innerHTML = '';
	const bgs = data.backgrounds;
	for (const b of bgs) {
		const option = createElement('option');
		option.value = b.id.toString();
		option.textContent = b.name;
		editorElements.dialogueTab.background.append(option);
	}
	editorElements.dialogueTab.background.value = bg.id.toString();
}
