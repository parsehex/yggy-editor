import * as path from 'path';
import * as fs from 'fs-extra';
import data from '../data';
import * as faker from 'faker';
import { ran } from '../utils';

export default async function generateCharacters(n: number) {
	const charsPath = path.resolve(__dirname, '../../../sample-assets/characters');
	const availCharImgs = await fs.readdir(charsPath);

	const num = Math.min(n, availCharImgs.length);

	const charFrames: [string, string?][] = [];
	for (let i = 0; i < num; i++) {
		// make sure all characters get a frame
		const imgi = ran(0, availCharImgs.length - 1);
		charFrames[i] = [availCharImgs[imgi]];

		// remove the image so that it doesn't come up again
		availCharImgs.splice(imgi, 1);
	}

	for (let i = 0; i < num; i++) {
		// try to give the remaining characters a second frame
		if (availCharImgs.length === 0) break;

		const imgi = ran(0, availCharImgs.length - 1);
		charFrames[i][1] = availCharImgs[imgi];

		availCharImgs.splice(imgi, 1);
	}

	for (const chf of charFrames) {
		gen(chf[0], chf[1]);
	}
}

function gen(frame1: string, frame2?: string) {
	const ext = frame1.slice(frame1.indexOf('.'));
	const imageID = data.images.length;
	const frameID = data.frames.length;
	const imgName = frame1.replace(ext, '').replace(/-|_/g, ' ');

	data.images.push({
		id: imageID,
		name: imgName,
		filename: frame1,
	});
	data.frames.push({
		id: frameID,
		imageID,
		name: 'Default frame',
	});

	data.characters.push({
		id: data.backgrounds.length - 1,
		name: faker.name.firstName(),
		frames: [frameID],
	});

	if (frame2) {
		const f2ext = frame2.slice(frame2.indexOf('.'));
		const f2imageID = data.images.length;
		const frame2ID = data.frames.length;
		const f2imgName = frame2.replace(f2ext, '').replace(/-|_/g, ' ');

		data.images.push({
			id: f2imageID,
			name: f2imgName,
			filename: frame2,
		});
		data.frames.push({
			id: frame2ID,
			imageID: f2imageID,
			name: faker.random.words(ran(1, 2)),
		});

		data.characters[data.characters.length - 1].frames.push(frame2ID);
	}
}
