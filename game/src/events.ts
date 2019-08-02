import delegate from './delegate';
import state from './state';
import draw from './draw';
import lookupData from './data/lookup';
import elements from './elements';

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

	elements.doc.getElementById('dialogue-box').addEventListener('click', next);
	window.addEventListener('keypress', next);

	function next(e: Event) {
		if (e instanceof KeyboardEvent && e.code !== 'Space' && e.code !== 'Enter') return;

		const choices = <HTMLButtonElement[]>Array.from(elements.doc.querySelectorAll('#choices button.choice'));

		// only continue when there's only one (hidden) choice
		if (choices.length !== 1 || !choices[0].classList.contains('hidden')) return;
		choices[0].click();

		e.preventDefault();
	}
}
