interface EditorState {
	/** History of dialogue navigation */
	history: number[];
	currentHistoryIndex: number;
	tree: {
		collapsed: {
			dialogue: number[];
			choices: number[]
		};
	};
}

const editorState: EditorState = {
	history: [],
	currentHistoryIndex: -1,
	tree: {
		collapsed: { dialogue: [], choices: [] },
	},
};

export default editorState;
