import { reactive } from '@vue/reactivity';

interface State {
	currentDialogueID: number;
}

const state: State = {
	currentDialogueID: null,
};
export default reactive(state);
