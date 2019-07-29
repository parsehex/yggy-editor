import delegate from './delegate';
import choices from './data/choices';
import state from './state';
import drawScene from './draw-scene';

delegate('div#choices button.choice', 'click', (e) => {
	const target = <HTMLElement>e.target;
	const choiceIndex = +target.dataset.index;
	const choice = choices[choiceIndex];
	state.currentDialogueIndex = choice.targetDialogueIndex;
	drawScene();
});
