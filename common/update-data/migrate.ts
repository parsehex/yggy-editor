import { clone } from '../utils';

export default function migrate(oldData: any, version: number) {
	const data = clone(oldData);
	const nextVersion = version + 1;

	switch (nextVersion) {
		case 2: {
			for (const d of data.dialogue) {
				// add "owner character", defaults to (currently) only character
				d.ownerCharacterID = d.characterID;

				// add second character (none by default)
				rename(d, 'characterID', 'character1ID');
				rename(d, 'characterFrameIndex', 'character1FrameIndex');
				d.character2ID = null;
				d.character2FrameIndex = null;
			}
			break;
		}
		case 1: {
			// add data.meta(.version)
			data.meta = {
				version: 1,
			};
			break;
		}
	}

	data.meta.version = nextVersion;

	return data;
}

function rename(object: any, key: string, newKey: string) {
	const tmp = object[key];
	delete object[key];
	object[newKey] = tmp;
}
