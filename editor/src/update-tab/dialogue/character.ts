import { Dialogue } from 'game/types';
import getData from 'game/data/get';
import data from 'game/data';
import editorElements from 'editor-elements';
import { createElement } from 'dom-util';
import * as morph from 'nanomorph';
import select from 'update-tab/common/select';

export default function updateCharacter(d: Dialogue) {
	const tmp = <HTMLDivElement>editorElements.dialogueTab.characters.cloneNode();
	const c = getData('characters', d.characterID);

	const char1 = character(c.id, d.characterFrameIndex);
	tmp.append(char1);

	morph(editorElements.dialogueTab.characters, tmp);
}

function character(characterID: number, selectedFrameIndex: number) {
	const ch = getData('characters', characterID);
	const div = createElement('div');
	div.className = 'character';
	div.dataset.id = characterID.toString();

	const charOptions = data.characters.map(ch => ({ text: ch.name, value: ch.id.toString() }));
	const charSelect = select('name', charOptions, characterID);
	div.append(charSelect);

	const frameOptions = ch.frames.map((fid, i) => ({
		text: getData('frames', fid).name,
		value: i.toString(),
	}));
	const frameSelect = select('frame', frameOptions, selectedFrameIndex);
	div.append(frameSelect);

	return div;
}
