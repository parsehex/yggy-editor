import updateDialogueTab from './dialogue';
import updateCharactersTab from './characters';
import updateBackgroundsTab from './background';
import updateImagesTab from './images';
import updateTreeTab from './tree';
import editorElements from 'editor-elements';
import editorState from 'state';
import { disabled } from 'dom-util';

export default function updateActiveTab() {
	// console.time('update');

	// only update whichever tab is active
	const activeTab = document.querySelector('.tab.active');
	const activeTabId = activeTab.id.toLowerCase();

	if (activeTabId.indexOf('dialogue') > -1) {
		updateDialogueTab();
	} else if (activeTabId.indexOf('characters') > -1) {
		updateCharactersTab();
	} else if (activeTabId.indexOf('tree') > -1) {
		updateTreeTab();
	} else if (activeTabId.indexOf('backgrounds') > -1) {
		updateBackgroundsTab();
	} else if (activeTabId.indexOf('images') > -1) {
		updateImagesTab();
	}

	// update history buttons
	disabled(editorElements.btnBack, editorState.currentHistoryIndex === 0);
	disabled(editorElements.btnNext, editorState.currentHistoryIndex === editorState.history.length - 1);

	// console.timeEnd('update');
}
