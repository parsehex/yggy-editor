import state from '../state';
import getData from '../data/get';
import elements from '../elements';
import drawCharacter from './character';

/** Draws whatever the current state is */
export default function drawScene() {
	const d = getData('dialogue', state.currentDialogueID);
	const bg = getData('backgrounds', d.backgroundID);
	const bgImg = getData('images', bg.imageID);

	elements.bg.style.backgroundImage = `url(/game-data/images/${bgImg.filename})`;
	elements.bg.style.backgroundColor = bg.bgColor;

	drawCharacter(d.character1ID, d.character1FrameIndex, 'left');
	drawCharacter(d.character2ID, d.character2FrameIndex, 'right');

	elements.dialogueText.textContent = d.text;

	resetChoices();
	let allHidden = true;
	for (const choiceID of d.choices) {
		const c = getData('choices', choiceID);
		addChoice(c.text, choiceID);
		if (c.text.length > 0) allHidden = false;
	}

	// show the name of the character that's talking
	if (d.ownerCharacterID !== null) {
		const ch = getData('characters', d.ownerCharacterID);
		elements.charName.textContent = ch.name;
		elements.charName.classList.remove('hidden');
	} else {
		// don't show character name if no one is talking
		elements.charName.classList.add('hidden');
	}

	// if all choices are hidden then show a "continue" indicator
	if (allHidden) {
		if (d.choices.length > 1) {
			throw new Error(`All ${d.choices.length} dialogue choices are hidden`);
		}
		elements.continueInd.classList.remove('hidden');
	} else {
		elements.continueInd.classList.add('hidden');
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
	if (text.length === 0) {
		// for convenience, just hide blank choices
		// (maybe there's a reason they're blank)
		btn.classList.add('hidden');
	}

	elements.choicesDiv.append(btn);
}
