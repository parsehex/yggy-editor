interface EditorState {
	/** History of dialogue navigation */
	history: number[];
	currentHistoryIndex: number;
}

const editorState: EditorState = {
	history: [],
	currentHistoryIndex: -1,
};

export default editorState;
