import data from 'game/data';

interface IDs {
	dialogue: number[];
	choices: number[];
	images: number[];
	characters: number[];
	backgrounds: number[];
}

const ids: IDs = { dialogue: [], choices: [], characters: [], images: [], backgrounds: [], };

export function getFreeID(type: keyof IDs) {
	let id = Math.floor(Math.random() * 9999999999);
	if (ids[type].indexOf(id) > -1) id = getFreeID(type);
	ids[type].push(id);
	return id;
}

/** Frees up an ID. Probably not very necessary. */
export function removeID(type: keyof IDs, id: number) {
	const i = ids[type].indexOf(id);
	ids[type].splice(i, 1);
}

export function initIDService() {
	const keys = Object.keys(ids);
	for (const k of keys) {
		for (const d of data[k]) {
			ids[k].push(d.id);
		}
	}
}
