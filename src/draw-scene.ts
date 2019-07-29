import state from './state';
import { lookupImage, lookupCharacter } from './lookup';
import elements from './elements';
import data from './data';

/** Draws the curent dialogue */
export default function drawScene() {
	const d = data.dialogue[state.currentDialogueIndex];

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
		const c = data.choices[choiceIndex];
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
