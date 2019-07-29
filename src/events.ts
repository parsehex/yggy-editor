import delegate from './delegate';
import state from './state';
import drawScene from './draw-scene';
import data from './data';

delegate('div#choices button.choice', 'click', (e) => {
	const target = <HTMLElement>e.target;
	const choiceIndex = +target.dataset.index;
	const choice = data.choices[choiceIndex];
	state.currentDialogueIndex = choice.targetDialogueIndex;
	drawScene();
});
