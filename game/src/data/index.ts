import { Dialogue, Image, Choice, Character, Background, Frame, Meta } from '../types';

export interface GameData {
	dialogue: Dialogue[];
	images: Image[];
	choices: Choice[];
	characters: Character[];
	backgrounds: Background[];
	frames: Frame[];
	meta: Meta;
}

const data: GameData = {
	dialogue: null,
	images: null,
	choices: null,
	characters: null,
	backgrounds: null,
	frames: null,
	meta: null,
};

export default data;
