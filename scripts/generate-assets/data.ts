import * as path from 'path';
import * as fs from 'fs-extra';
import { GameData } from '../../game/src/data';

const data: GameData = {
	characters: [],
	choices: [],
	dialogue: [],
	backgrounds: [],
	frames: [],
	images: [],
	meta: {
		version: 2,
	},
};

export default data;

export function find<T extends Exclude<keyof GameData, 'meta'>>(
	type: T,
	id: number
): GameData[T][0] {
	const list = data[type];

	// this is used a lot; use normal for loop
	// tslint:disable-next-line
	for (let i = 0; i < list.length; i++) {
		if (list[i].id === id) return list[i];
	}
	return null;
}

const samplePath = path.resolve(__dirname, '../../sample-assets');
const savePath = path.resolve(__dirname, '../../editor/public/game-data');
export async function save() {
	// create savePath if it doesn't exist
	try {
		await fs.remove(savePath);
	} catch (e) { }
	await fs.mkdirp(path.join(savePath, 'data'));
	await fs.mkdirp(path.join(savePath, 'images'));

	console.log('Saving generated data');

	const keys = Object.keys(data);
	for (const k of keys) {
		const p = path.join(savePath, 'data', k + '.json');
		const c = JSON.stringify(data[k], null, 2);
		await fs.writeFile(p, c, { encoding: 'utf8' });
	}

	console.log('Saving placeholder images');

	const savedImages = [];

	// copy character images
	// i know i could just loop through all frames; playing it safe-ish
	for (const ch of data.characters) {
		for (const fid of ch.frames) {
			const f = find('frames', fid);
			const img = find('images', f.imageID);

			if (savedImages.indexOf(img.filename) > -1) continue;

			const src = path.join(samplePath, '/characters', img.filename);
			const dest = path.join(savePath, '/images', img.filename);

			await fs.copyFile(src, dest);
			savedImages.push(img.filename);
		}
	}

	// copy background images
	for (const b of data.backgrounds) {
		const img = find('images', b.imageID);

		if (savedImages.indexOf(img.filename) > -1) continue;

		const src = path.join(samplePath, '/backgrounds', img.filename);
		const dest = path.join(savePath, '/images', img.filename);

		await fs.copyFile(src, dest);
		savedImages.push(img.filename);
	}

	console.log('Done');
}
