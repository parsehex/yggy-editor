import editorState from './state';
import state from '../../src/state';

/** Call `draw()` afterwards */
export function goToNext() {
	const nextHistoryIndex = editorState.currentHistoryIndex + 1;
	if (nextHistoryIndex >= editorState.history.length) return;

	state.currentDialogueID = editorState.history[nextHistoryIndex];
	editorState.currentHistoryIndex++;
}
/** Call `draw()` afterwards */
export function goToPrev() {
	const prevHistoryIndex = editorState.currentHistoryIndex - 1;
	if (prevHistoryIndex < 0) return;

	state.currentDialogueID = editorState.history[prevHistoryIndex];
	editorState.currentHistoryIndex--;
}

/**
 * Add a dialogue to the history.
 * 
 * If not at the end of history then all forward history is cleared.
 * 
 * You should `draw()` afterwards.
 */
export function push(dialogueID: number) {
	if (editorState.currentHistoryIndex < editorState.history.length - 1) {
		editorState.history.length = editorState.currentHistoryIndex + 1;
	}

	state.currentDialogueID = dialogueID;
	editorState.history.push(dialogueID);
	editorState.currentHistoryIndex++;
}
