import { addDialogue, addChoice } from './objects';
import state from './state';

document.getElementById('dialogue').addEventListener('click', () => {
	const d = {
		text: 'Dialogue text',
		node: null,
		choices: [],
	};
	addDialogue(d);
	state.dialogue.push(d);
});

document.getElementById('choice').addEventListener('click', () => {
	const c = {
		text: 'Choice text',
		node: null,
		nextDialogue: null,
	};
	addChoice(c);
	state.choices.push(c);
});
