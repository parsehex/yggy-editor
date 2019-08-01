import { Dialogue } from 'game/types';
import lookupData from 'game/data/lookup';
import data from 'game/data';
import editorElements from 'editor-elements';

export default function updateBackground(d: Dialogue) {
	const bg = lookupData.background(d.backgroundID);
	const img = lookupData.image(bg.imageID);

	editorElements.background.innerHTML = '';
	const bgs = data.backgrounds;
	for (const b of bgs) {
		const option = document.createElement('option');
		option.value = b.id.toString();
		option.textContent = b.name;
		editorElements.background.append(option);
	}
	editorElements.background.value = bg.id.toString();
}
