import { Dialogue, Image, Choice, Character, Background, Frame } from '../types';

export interface GameData {
	dialogue: Dialogue[];
	images: Image[];
	choices: Choice[];
	characters: Character[];
	backgrounds: Background[];
	frames: Frame[];
}

const data: GameData = {
	dialogue: null,
	images: null,
	choices: null,
	characters: null,
	backgrounds: null,
	frames: null,
};

export default data;
