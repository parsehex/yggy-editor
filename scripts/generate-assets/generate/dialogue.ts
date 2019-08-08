import { chance, ran, pick } from '../utils';
import data, { find } from '../data';
import * as faker from 'faker';

const targetNumChoices = 4;

export default function generateDialogueTree(maxDepth: number) {
	genDialogue(-1, maxDepth);
}

function genDialogue(depth: number, maxDepth: number, fromDialogueID?: number, fromChoiceID?: number) {
	if (depth >= maxDepth) return;

	// include a chance of ending branch anyway
	if (chance(15) && depth > 2) return;

	depth++;

	data.dialogue.push({
		id: data.dialogue.length,
		text: faker.lorem.sentences(ran(1, 3)),
		character1ID: null,
		character1FrameIndex: null,
		character2ID: null,
		character2FrameIndex: null,
		choices: [],
		ownerCharacterID: null,
		// pick a random background:
		backgroundID: pick(data.backgrounds).id,
	});

	const d = data.dialogue[data.dialogue.length - 1];

	// hook up whatever choice we came from
	if (fromChoiceID !== undefined) find('choices', fromChoiceID).targetDialogueID = d.id;

	// character 1 35% chance
	if (chance(35)) {
		const ch1 = pick(data.characters);
		d.character1ID = ch1.id;
		d.character1FrameIndex = ran(-1, ch1.frames.length - 1);
		if (d.character1FrameIndex === -1) d.character1FrameIndex = null;
	}

	// character 2 35% chance unless there's no character 1
	let char2Chance = 35;
	if (d.character1ID === null) char2Chance = 65;
	if (chance(char2Chance)) {
		const ch2 = pick(data.characters);

		// prevent same character twice
		if (d.character1ID !== ch2.id) {
			d.character2ID = ch2.id;
			d.character2FrameIndex = ran(-1, ch2.frames.length - 1);
			if (d.character2FrameIndex === -1) d.character2FrameIndex = null;
		}
	}

	// pick an owner
	if (d.character1ID !== null || d.character2ID !== null) {
		const ids = [];
		if (d.character1ID !== null) ids.push(d.character1ID);
		if (d.character2ID !== null) ids.push(d.character2ID);
		d.ownerCharacterID = pick(ids);
	}

	const choicesNum = ran(1, targetNumChoices);
	for (let i = 0; i < choicesNum; i++) {
		const choiceID = data.choices.length;
		data.choices.push({
			id: choiceID,
			text: faker.lorem.sentence(),
			targetDialogueID: null,
		});
		d.choices.push(choiceID);

		// 15% chance to reference some other dialogue with a choice
		const refDialogue = pick(data.dialogue);
		if (chance(15) && refDialogue.id !== d.id && refDialogue.id !== fromDialogueID) {
			data.choices[data.choices.length - 1].targetDialogueID = refDialogue.id;
			continue;
		}

		genDialogue(depth, maxDepth, d.id, choiceID);
	}
}
