import state from './state';
import lookupData from './data/lookup';
import elements from './elements';

/** Draws whatever the current state is */
export default function drawScene() {
	const dia = lookupData.dialogue(state.currentDialogueID);
	const char = lookupData.character(dia.characterID);
	const bg = lookupData.background(dia.backgroundID);

	const bgImg = lookupData.image(bg.imageID);
	elements.bg.style.backgroundImage = `url(/assets/images/${bgImg.filename})`;
	elements.bg.style.backgroundColor = bg.bgColor;

	const charImg = lookupData.image(char.imageID);
	elements.charImg.style.backgroundImage = `url(/assets/images/${charImg.filename})`;
	elements.charName.textContent = char.name;
	elements.dialogueText.textContent = dia.text;

	resetChoices();
	for (let i = 0; i < dia.choices.length; i++) {
		const choiceID = dia.choices[i];
		const c = lookupData.choice(choiceID);
		addChoice(c.text, choiceID);
	}
}

function resetChoices() {
	elements.choicesDiv.innerHTML = '';
}

function addChoice(text: string, id: number) {
	const btn = document.createElement('button');
	btn.className = 'choice';
	btn.type = 'button';
	btn.textContent = text;
	btn.dataset.id = id.toString();

	elements.choicesDiv.append(btn);
}
