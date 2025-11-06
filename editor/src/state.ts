import { reactive } from '@vue/reactivity';

interface EditorState {
	devMode: boolean;
	/** History of dialogue navigation */
	history: number[];
	currentHistoryIndex: number;
	tree: {
		collapsed: {
			dialogue: number[];
			choices: number[];
		};

		// TODO link history
		linking: {
			dialogueID: number;
			srcDialogueID: number;
			choiceID: number;
			finalized: boolean;
		};
		// To track all dialogue IDs rendered in the entire tree for reference detection
		renderedDialogueIDs: Set<number>;
	};
}

const editorState: EditorState = {
	// prod server runs on 80 (reverse proxy)
	devMode: location.href.includes('8080'),
	history: [],
	currentHistoryIndex: -1,
	tree: {
		collapsed: { dialogue: [], choices: [] },
		linking: {
			dialogueID: null,
			srcDialogueID: null,
			choiceID: null,
			finalized: false,
		},
		renderedDialogueIDs: new Set(),
	},
};

export default reactive(editorState);
