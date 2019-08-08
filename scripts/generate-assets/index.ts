import parseArgs from './parse-args';
import generateBackgrounds from './generate/backgrounds';
import { save } from './data';
import generateCharacters from './generate/characters';
import generateDialogueTree from './generate/dialogue';
import * as faker from 'faker';

// for now this is a little inflexible. options:
// -d [number] = Max dialogue tree depth
// -c [number] = Number of characters to create
// -b [number] = Number of backgrounds to create
// -s [number] = Use specific seed
// notes:
// -- Data that requires an image (only characters and backgrounds right now)
//   will be pulled from a pool of those images in the `sample-assets` directory in project root.
// -- If there are less images than the passed max, then the lower number will be used.
// -- The max dialogue tree depth won't necessarily be generated every time, it's only a max.
// -- Similarly, it's possible that some generated characters/backgrounds won't be used.
// -- It will attempt to give each character 2 frames.

(async () => {
	const options = await parseArgs();
	faker.seed(options.seed);

	console.log(`Generating data with seed ${options.seed}`);

	await generateBackgrounds(options.backgrounds);
	await generateCharacters(options.characters);
	generateDialogueTree(options.dialogueDepth);

	await save();
})();
