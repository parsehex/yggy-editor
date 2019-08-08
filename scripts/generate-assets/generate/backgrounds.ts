import * as path from 'path';
import * as fs from 'fs-extra';
import data from '../data';
import * as faker from 'faker';
import { ran } from '../utils';

export default async function generateBackgrounds(n: number) {
	const bgsPath = path.resolve(__dirname, '../../../sample-assets/backgrounds');
	const availBgs = await fs.readdir(bgsPath);

	const num = Math.min(n, availBgs.length);

	for (let i = 0; i < num; i++) {
		gen(availBgs[i]);
	}
}

function gen(filename: string) {
	const ext = filename.slice(filename.indexOf('.'));
	const imageID = data.images.length;
	const name = filename.replace(ext, '').replace(/-|_/g, ' ');

	data.images.push({
		id: imageID,
		name,
		filename,
	});
	data.backgrounds.push({
		id: data.backgrounds.length,
		imageID,
		name: faker.random.words(ran(1, 3)),
		bgColor: '#fff',
	});
}
