import gameState from 'game/state';
import getData from 'game/data/get';
import editorElements from 'editor-elements';
import updateChoices from './choices';
import updateCharacter from './character';
import updateBackground from './background';

export default function updateDialogueTab() {
	const d = getData('dialogue', gameState.currentDialogueID);

	editorElements.dialogueTab.dialogue.value = d.text;
	updateChoices(d);
	updateCharacter(d);
	updateBackground(d);
}
