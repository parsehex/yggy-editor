import characters from './data/characters';
import images from './data/images';

export function lookupImage(imgName: string) {
	for (const i of images) {
		if (i.name === imgName) return i;
	}
}
export function lookupCharacter(char: string) {
	for (const c of characters) {
		if (c.name === char) return c;
	}
}
