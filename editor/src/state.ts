interface EditorState {
	devMode: boolean;
	/** History of dialogue navigation */
	history: number[];
	currentHistoryIndex: number;
	tree: {
		collapsed: {
			dialogue: number[];
			choices: number[]
		};

		// TODO link history
		linking: {
			dialogueID: number;
			srcDialogueID: number;
			choiceID: number;
			finalized: boolean;
		};
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
	},
};

export default editorState;
