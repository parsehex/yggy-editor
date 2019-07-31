import { Dialogue } from 'game/types';
import lookupData from 'game/data/lookup';
import data from 'game/data';
import editorElements from 'editor-elements';

export default function updateBackground(d: Dialogue) {
	const bg = lookupData.image(d.imageID);

	editorElements.background.innerHTML = '';
	const imgs = data.images;
	for (const img of imgs) {
		const option = document.createElement('option');
		option.value = img.id.toString();
		option.textContent = img.name;
		editorElements.background.append(option);
	}
	editorElements.background.value = bg.id.toString();
}
