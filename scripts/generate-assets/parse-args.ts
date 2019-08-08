import * as path from 'path';
import * as fs from 'fs-extra';

interface CLIOptions {
	dialogueDepth: number;
	characters: number;
	backgrounds: number;
	seed: number;
}

export default async function parseArgs(): Promise<CLIOptions> {
	const o: CLIOptions = <any>{};
	const argv = process.argv.slice(2);

	let option: string;
	for (const a of argv) {
		if (a.indexOf('-') === 0) {
			option = a.replace(/-/g, '');
			continue;
		}
		const val = +a;

		if (Number.isNaN(val)) continue;

		if (option === 'd') {
			o.dialogueDepth = val;
		} else if (option === 'c') {
			o.characters = val;
		} else if (option === 'b') {
			o.backgrounds = val;
		} else if (option === 's') {
			o.seed = val;
		}
	}

	const bgsPath = path.resolve(__dirname, '../../sample-assets/backgrounds');
	const charsPath = path.resolve(__dirname, '../../sample-assets/characters');

	const availChars = await fs.readdir(charsPath);
	const availBgs = await fs.readdir(bgsPath);

	return Object.assign({}, o, {
		dialogueDepth: 5,
		characters: Math.floor(availChars.length / 2),
		backgrounds: availBgs.length,
		seed: Math.floor(Math.random() * 5000),
	});
}
