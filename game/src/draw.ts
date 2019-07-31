import state from './state';
import lookup from './lookup';
import elements from './elements';

/** Draws whatever the current state is */
export default function drawScene() {
	const dia = lookup.dialogue(state.currentDialogueID);
	const char = lookup.character(dia.characterID);

	if (dia.imageID !== undefined) {
		const img = lookup.image(dia.imageID);
		elements.bg.style.backgroundImage = `url(/assets/images/${img.filename})`;
		elements.bg.style.backgroundColor = img.bgColor;
	}

	elements.charImg.style.backgroundImage = `url(/assets/images/${char.imageFilename})`;
	elements.charName.textContent = char.name
	elements.dialogueText.textContent = dia.text;

	resetChoices();
	for (let i = 0; i < dia.choices.length; i++) {
		const choiceID = dia.choices[i];
		const c = lookup.choice(choiceID);
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
