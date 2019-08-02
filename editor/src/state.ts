interface EditorState {
	/** History of dialogue navigation */
	history: number[];
	currentHistoryIndex: number;
	tree: {
		collapsed: {
			dialogue: number[];
			choices: number[]
		};
		linking: {
			dialogueID: number;
			srcDialogueID: number;
			choiceID: number;
			finalized: boolean;
		};
	};
}

const editorState: EditorState = {
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
