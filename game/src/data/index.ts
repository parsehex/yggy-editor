import { Dialogue, Img, DialogueChoice, Character } from '../types';

interface Data {
	dialogue: Dialogue[];
	images: Img[];
	choices: DialogueChoice[];
	characters: Character[];
}

const data: Data = {
	dialogue: null,
	images: null,
	choices: null,
	characters: null,
};

export default data;
