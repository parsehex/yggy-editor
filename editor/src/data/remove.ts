import getData from 'game/data/get';
import data from 'game/data';
import editorState from 'state';
import { Character } from 'game/types';

function choice(id: number) {
	const c = getData('choices', id);
	data.choices.splice(data.choices.indexOf(c), 1);

	// remove id from all choices lists
	for (const d of data.dialogue) {
		if (d.choices.indexOf(id) > -1) {
			d.choices.splice(d.choices.indexOf(id), 1);
		}
	}

	// remove from tree state just in case
	const ti = editorState.tree.collapsed.choices.indexOf(c.id);
	if (ti > -1) editorState.tree.collapsed.choices.splice(ti, 1);
}
function character(id: number) {
	const ch = getData('characters', id);
	data.characters.splice(data.characters.indexOf(ch), 1);

	const defaultID = data.characters[0].id;

	// remove id from all dialogue
	for (const d of data.dialogue) {
		if (d.characterID === id) {
			d.characterID = defaultID;
		}
	}
}
function background(id: number) {
	const bg = getData('backgrounds', id);
	data.backgrounds.splice(data.backgrounds.indexOf(bg), 1);

	const defaultID = data.backgrounds[0].id;

	// remove id from all dialogue
	for (const d of data.dialogue) {
		if (d.backgroundID === id) {
			d.backgroundID = defaultID;
		}
	}
}
function image(id: number) {
	const img = getData('images', id);
	data.images.splice(data.images.indexOf(img), 1);

	// TODO allow setting default image
	const defaultID = data.images[0].id;

	// remove id from all characters, backgrounds
	for (const bg of data.backgrounds) {
		if (bg.imageID === id) {
			bg.imageID = defaultID;
		}
	}
	for (const f of data.frames) {
		if (f.imageID === id) {
			f.imageID = defaultID;
		}
	}
}
function dialogue(id: number) {
	const d = getData('dialogue', id);
	data.dialogue.splice(data.dialogue.indexOf(d), 1);
}
function frame(id: number) {
	const f = getData('frames', id);

	// check to see if the frame is first (default) for any characters
	// also make a list of characters which reference this frame for later
	const removeFromChars: Character[] = [];
	let isFirstIndex = false;
	for (const ch of data.characters) {
		const fi = ch.frames.indexOf(id);
		if (fi === 0) {
			isFirstIndex = true;
			break;
		} else if (fi > 0) {
			removeFromChars.push(ch);
		}
	}

	// the first frame is reserved as the default frame so don't remove it from any characters
	if (isFirstIndex) return;

	for (const ch of removeFromChars) {
		ch.frames.splice(ch.frames.indexOf(id), 1);
	}

	// finally remove the frame
	data.frames.splice(data.frames.indexOf(f), 1);
}

export default { choice, character, background, image, dialogue, frame };
