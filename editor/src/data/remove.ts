import lookupData from 'game/data/lookup';
import data from 'game/data';
import editorState from 'state';

function choice(id: number) {
	const c = lookupData.choice(id);
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
	const ch = lookupData.character(id);
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
	const bg = lookupData.background(id);
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
	const img = lookupData.image(id);
	data.images.splice(data.images.indexOf(img), 1);

	const defaultID = data.images[0].id;

	// remove id from all characters, backgrounds
	for (const bg of data.backgrounds) {
		if (bg.imageID === id) {
			bg.imageID = defaultID;
		}
	}
	for (const bg of data.characters) {
		if (bg.imageID === id) {
			bg.imageID = defaultID;
		}
	}
}

export default { choice, character, background, image };
