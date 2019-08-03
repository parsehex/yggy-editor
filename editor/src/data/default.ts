import data, { GameData } from 'game/data';

// not 100% that this will actually be helpful
export default function getDefault<T extends keyof GameData>(type: T): GameData[T][0] {
	switch (type) {
		case 'backgrounds': {
			return data.backgrounds[0];
		}
		case 'images': {
			return data.images[0];
		}
		case 'characters': {
			return data.characters[0];
		}
	}
}
