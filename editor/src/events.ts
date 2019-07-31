import data from 'game/data';
import gameState from 'game/state';
import lookupData from 'game/data/lookup';
import _editorDelegate from './delegate';
import draw from './draw';
import { goToPrev, goToNext } from './navigation';
import remove from './data/remove';
import { getFreeID } from './id-service';

export function initEditorEvents() {
	// update dialogue
	_editorDelegate('textarea#dialogue', 'change', (e, t: HTMLTextAreaElement) => {
		const d = lookupData.dialogue(gameState.currentDialogueID);
		d.text = t.value;
		draw();
	});

	// update choice
	_editorDelegate('div#choices .choice', 'change', (e, t: HTMLTextAreaElement) => {
		const id = +t.dataset.id;
		const c = lookupData.choice(id);
		c.text = t.value;
		draw();
	});

	_editorDelegate('button#nav-back', 'click', () => {
		goToPrev();
		draw();
	});
	_editorDelegate('button#nav-next', 'click', () => {
		goToNext();
		draw();
	});

	// add choice (to current dialogue)
	_editorDelegate('#choices button.add', 'click', () => {
		const id = getFreeID('choices');
		data.choices.push({
			id,
			text: 'Choice text',
			targetDialogueID: null,
		});
		const d = lookupData.dialogue(gameState.currentDialogueID);
		d.choices.push(id);
		draw();
	});

	// delete choice
	_editorDelegate('#choices button.delete', 'click', (e, t) => {
		const id = +t.dataset.id;
		remove.choice(id);
		draw();
	});

	// resize the game to take the whole screen
	_editorDelegate('button#game-size', 'click', (e, t: HTMLButtonElement) => {
		const iframe = document.querySelector('iframe');
		const editorDiv = document.getElementById('editor');
		const isHidden = editorDiv.classList.contains('hidden');

		if (isHidden) {
			iframe.style.width = '';
			editorDiv.classList.remove('hidden');
			t.innerHTML = '&gt;';
		} else {
			iframe.style.width = '100%';
			editorDiv.classList.add('hidden');
			t.innerHTML = '&lt;';
		}
	});

	// change dialogue character
	_editorDelegate('select#character', 'click', (e, t: HTMLSelectElement) => {
		const charId = +t.value;
		const d = lookupData.dialogue(gameState.currentDialogueID);
		d.characterID = charId;
		draw();
	});

	// change dialogue background
	_editorDelegate('select#background', 'click', (e, t: HTMLSelectElement) => {
		const bgId = +t.value;
		const d = lookupData.dialogue(gameState.currentDialogueID);
		d.imageID = bgId;
		draw();
	});

	// save
	_editorDelegate('button#save', 'click', async (e, t: HTMLButtonElement) => {
		t.classList.add('active');
		t.disabled = true;
		t.textContent = 'Saving...';

		const keys = Object.keys(data);
		for (const k of keys) {
			await fetch('/api/save', {
				method: 'post',
				body: JSON.stringify({
					type: k,
					data: data[k],
				}),
			});
		}

		t.classList.remove('active');
		t.textContent = 'Saved';

		setTimeout(() => {
			t.disabled = false;
			t.textContent = 'Save';
		}, 750);
	});
}
