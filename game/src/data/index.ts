import { Dialogue, Image, DialogueChoice, Character, Background } from '../types';

interface Data {
	dialogue: Dialogue[];
	images: Image[];
	choices: DialogueChoice[];
	characters: Character[];
	backgrounds: Background[];
}

const data: Data = {
	dialogue: null,
	images: null,
	choices: null,
	characters: null,
	backgrounds: null,
};

export default data;
