import { Dialogue, Character } from 'game/types';
import getData from 'game/data/get';
import data from 'game/data';
import editorElements from 'editor-elements';
import { createElement } from 'dom-util';
import morph from 'nanomorph';
import createSelect, { SelectOptions } from 'update-tab/common/select';
import createSpan from 'update-tab/common/span';

export default function updateCharacter(d: Dialogue) {
	// const tmp = <HTMLDivElement>editorElements.dialogueTab.characters.cloneNode();
	// const ch1 = getData('characters', d.character1ID);
	// const char1 = character('1', ch1, d.character1FrameIndex, d.ownerCharacterID);
	// tmp.append(char1);
	// const ch2 = getData('characters', d.character2ID);
	// const char2 = character('2', ch2, d.character2FrameIndex, d.ownerCharacterID);
	// tmp.append(char2);
	// morph(editorElements.dialogueTab.characters, tmp);
}

// function character(num: string, ch: Character, selectedFrameIndex: number, dialogueOwner: number, excludeID?: number) {
// 	const characterID: any = ch === null ? 'none' : ch.id;
// 	const div = createElement('div');
// 	div.className = 'character';
// 	div.dataset.id = characterID.toString();

// 	const charOptions: SelectOptions = data.characters.map(char => ({
// 		text: char.name,
// 		value: char.id.toString(),
// 	}));
// 	charOptions.unshift({ text: 'None' });
// 	const label = createSpan('', 'Character ' + num + ':');
// 	const charSelect = createSelect('name', charOptions, characterID);
// 	div.append(label);
// 	div.append(charSelect);

// 	if (ch === null) return div;

// 	const frameOptions: SelectOptions = ch.frames.map((fid, i) => ({
// 		text: getData('frames', fid).name,
// 		value: i.toString(),
// 	}));
// 	frameOptions.unshift({ text: 'None' });
// 	const frameSelect = createSelect('frame', frameOptions, selectedFrameIndex);
// 	div.append(frameSelect);

// 	const ownerLabel = createElement('label');
// 	ownerLabel.className = 'owner';
// 	ownerLabel.htmlFor = 'dialogue-owner-ch' + characterID;
// 	ownerLabel.textContent = 'Talking:';
// 	div.append(ownerLabel);

// 	const ownerCheckbox = createElement('input');
// 	ownerCheckbox.className = 'owner';
// 	ownerCheckbox.type = 'checkbox';
// 	ownerCheckbox.checked = dialogueOwner === characterID;
// 	ownerCheckbox.id = 'dialogue-owner-ch' + characterID;
// 	div.append(ownerCheckbox);

// 	return div;
// }
