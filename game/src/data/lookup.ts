import data from './index';

function dialogue(id: number) {
	for (const d of data.dialogue) {
		if (d.id === id) return d;
	}
}
function choice(id: number) {
	for (const c of data.choices) {
		if (c.id === id) return c;
	}
}
function image(id: number) {
	for (const i of data.images) {
		if (i.id === id) return i;
	}
}
function character(id: number) {
	for (const c of data.characters) {
		if (c.id === id) return c;
	}
}

const lookupData = { dialogue, choice, image, character };
export default lookupData;
