import { getFreeID } from 'id-service';
import data from 'game/data';
import { Dialogue, DialogueChoice } from 'game/types';

function dialogue(defBackgroundID: number, defCharacterID: number) {
	const d: Dialogue = {
		id: getFreeID('dialogue'),
		text: 'Dialogue text',
		choices: [],
		backgroundID: defBackgroundID,
		characterID: defCharacterID,
	};
	data.dialogue.push(d);
	return d;
}
function choice() {
	const c: DialogueChoice = {
		id: getFreeID('choices'),
		text: 'Choice text',
		targetDialogueID: null,
	};
	data.choices.push(c);
	return c;
}

const createData = { dialogue, choice };
export default createData;
