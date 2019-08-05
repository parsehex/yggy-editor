import { getFreeID } from 'id-service';
import data from 'game/data';
import { Dialogue, Choice, Character, Frame } from 'game/types';
import getDefault from './default';

// TODO accept optional "defaultData" dialogue object
function dialogue(templateDialogue?: Dialogue) {
	const d: Dialogue = {
		id: getFreeID('dialogue'),
		text: 'Dialogue text',
		choices: [],
		backgroundID: templateDialogue.backgroundID || getDefault('backgrounds').id,
		character1ID: templateDialogue.character1ID || getDefault('characters').id,
		character1FrameIndex: templateDialogue.character1FrameIndex || 0,
		character2ID: templateDialogue.character2ID || null,
		character2FrameIndex: templateDialogue.character2FrameIndex || null,
		ownerCharacterID: templateDialogue.ownerCharacterID || getDefault('characters').id,
	};
	data.dialogue.push(d);
	return d;
}
function choice() {
	const c: Choice = {
		id: getFreeID('choices'),
		text: 'Choice text',
		targetDialogueID: null,
	};
	data.choices.push(c);
	return c;
}

/** Creates a new character **AND** a new default frame for it */
function character() {
	const f = frame();
	const ch: Character = {
		id: getFreeID('characters'),
		name: 'New Character',
		frames: [f.id],
	};
	data.characters.push(ch);
	return ch;
}

function frame(name?: string) {
	const f: Frame = {
		id: getFreeID('frames'),
		name: name || 'Default frame',
		imageID: getDefault('images').id,
	};
	data.frames.push(f);
	return f;
}

const createData = { dialogue, choice, character, frame };
export default createData;
