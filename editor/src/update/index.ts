import gameState from 'game/state';
import lookupData from 'game/data/lookup';
import { disabled } from '../dom-util';
import editorState from '../state';
import editorElements from 'editor-elements';
import updateChoices from './choices';
import updateCharacter from './character';
import updateBackground from './background';

export default function update() {
	console.time('update')
	const d = lookupData.dialogue(gameState.currentDialogueID);

	editorElements.dialogue.value = d.text;
	updateChoices(d);
	updateCharacter(d);
	updateBackground(d);

	// update history buttons
	disabled(editorElements.btnBack, editorState.currentHistoryIndex === 0);
	disabled(editorElements.btnNext, editorState.currentHistoryIndex === editorState.history.length - 1);
	console.timeEnd('update');
}
