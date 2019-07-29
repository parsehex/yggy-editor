import data from './data';

export function lookupImage(imgName: string) {
	for (const i of data.images) {
		if (i.name === imgName) return i;
	}
}
export function lookupCharacter(char: string) {
	for (const c of data.characters) {
		if (c.name === char) return c;
	}
}
