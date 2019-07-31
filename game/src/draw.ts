import state from './state';
import lookupData from './data/lookup';
import elements from './elements';

/** Draws whatever the current state is */
export default function drawScene() {
	const dia = lookupData.dialogue(state.currentDialogueID);
	const char = lookupData.character(dia.characterID);

	const img = lookupData.image(dia.imageID);
	elements.bg.style.backgroundImage = `url(/assets/images/${img.filename})`;
	elements.bg.style.backgroundColor = img.bgColor;

	elements.charImg.style.backgroundImage = `url(/assets/images/${char.imageFilename})`;
	elements.charName.textContent = char.name
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
