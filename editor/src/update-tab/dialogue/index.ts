import gameState from 'game/state';
import lookupData from 'game/data/lookup';
import { disabled } from '../../dom-util';
import editorState from '../../state';
import editorElements from 'editor-elements';
import updateChoices from './choices';
import updateCharacter from './character';
import updateBackground from './background';

export default function updateDialogueTab() {
	const d = lookupData.dialogue(gameState.currentDialogueID);

	editorElements.dialogueTab.dialogue.value = d.text;
	updateChoices(d);
	updateCharacter(d);
	updateBackground(d);
}
