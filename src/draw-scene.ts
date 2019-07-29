import dialogue from './data/dialogue';
import state from './state';
import { lookupImage, lookupCharacter } from './lookup';
import choices from './data/choices';
import elements from './elements';

/** Draws the curent dialogue */
export default function drawScene() {
	const d = dialogue[state.currentDialogueIndex];

	if (d.image) {
		const img = lookupImage(d.image);
		elements.bg.style.backgroundImage = `url(/assets/images/${img.filename})`;
		elements.bg.style.backgroundColor = img.bgColor;
	}

	const char = lookupCharacter(d.character);

	elements.charImg.style.backgroundImage = `url(/assets/images/${char.imageFilename})`;
	elements.charName.textContent = d.character;
	elements.dialogueText.textContent = d.text;

	resetChoices();
	for (let i = 0; i < d.choices.length; i++) {
		const choiceIndex = d.choices[i];
		const c = choices[choiceIndex];
		addChoice(c.text, choiceIndex);
	}
}

function resetChoices() {
	elements.choicesDiv.innerHTML = '';
}

function addChoice(text: string, index: number) {
	const btn = document.createElement('button');
	btn.className = 'choice';
	btn.type = 'button';
	btn.textContent = text;
	btn.dataset.index = index.toString();

	elements.choicesDiv.append(btn);
}
