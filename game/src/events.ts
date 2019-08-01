import delegate from './delegate';
import state from './state';
import draw from './draw';
import lookupData from './data/lookup';

export function initEvents() {
	delegate('div#choices button.choice', 'click', (e) => {
		const target = <HTMLElement>e.target;
		const choiceID = +target.dataset.id;
		const choice = lookupData.choice(choiceID);
		// bandaid fix; don't try to navigate to null dialogue
		if (choice.targetDialogueID === null) return;
		state.currentDialogueID = choice.targetDialogueID;
		draw();
	});
}
