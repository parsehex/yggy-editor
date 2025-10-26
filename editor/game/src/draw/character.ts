import { Character, Frame } from '../types';
import getData from '../data/get';
import elements from '../elements';
import { getFullUrl } from 'common/utils';

export default function drawCharacter(id: number, frameIndex: number, pos: 'left' | 'right') {
	let ch: Character;

	const charImg = pos === 'left' ? elements.char1Img : elements.char2Img;

	if (id === null) {
		// hide name, etc.
		elements.charName.classList.add('hidden');
		charImg.classList.add('hidden');
		return;
	} else {
		ch = getData('characters', id);
		elements.charName.classList.remove('hidden');
	}

	if (frameIndex === null) {
		charImg.classList.add('hidden');
	} else {
		const frame = getData('frames', ch.frames[frameIndex]);
		const frameImg = getData('images', frame.imageID);
		charImg.src = getFullUrl(`./game-data/images/${frameImg.filename}`);
		charImg.classList.remove('hidden');
	}
}
