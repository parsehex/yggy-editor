import data from 'game/data';
import gameState from 'game/state';
import lookupData from 'game/data/lookup';
import _editorDelegate from './delegate';
import draw from './draw';
import { goToPrev, goToNext } from './navigation';
import remove from './data/remove';
import { getFreeID } from './id-service';
import editorElements from 'editor-elements';

export function initEditorEvents() {
	// update dialogue
	_editorDelegate('textarea#dialogue', 'input', (e, t: HTMLTextAreaElement) => {
		const d = lookupData.dialogue(gameState.currentDialogueID);
		d.text = t.value;
		draw();
	});

	// update choice
	_editorDelegate('div#choices .choice', 'input', (e, t: HTMLTextAreaElement) => {
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
		d.backgroundID = bgId;
		draw();
	});

	// push to server
	_editorDelegate('button#push', 'click', async (e, t: HTMLButtonElement) => {
		t.classList.add('active');
		t.disabled = true;
		t.textContent = 'Pushing...';

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
		t.textContent = 'Pushed';
		setTimeout(() => {
			t.disabled = false;
			t.textContent = 'Push changes';
		}, 750);
	});

	// pull from server
	_editorDelegate('button#pull', 'click', async (e, t: HTMLButtonElement) => {
		t.classList.add('active');
		t.disabled = true;
		t.textContent = 'Pulling...';

		const keys = Object.keys(data);
		for (const k of keys) {
			const r = await fetch('/api/get?type=' + k);
			const d = await r.json();
			data[k] = d;
		}

		save(editorElements.btnSave);
		draw();

		t.classList.remove('active');
		t.textContent = 'Pulled';
		setTimeout(() => {
			t.disabled = false;
			t.textContent = 'Pull changes';
		}, 750);
	});

	// save to localstorage
	_editorDelegate('button#save', 'click', async (e, t: HTMLButtonElement) => {
		save(t);
	});

	let noAutoSave = false;
	// clear localstorage
	_editorDelegate('button#clear', 'click', async (e, t: HTMLButtonElement) => {
		noAutoSave = true;
		localStorage.clear();
		t.textContent = 'Cleared';
		setTimeout(() => {
			location.reload();
		}, 500);
	});

	setInterval(save.bind(null, editorElements.btnSave, true), 15000);
	window.addEventListener('beforeunload', save.bind(null, editorElements.btnSave, true));
	function save(btn: HTMLButtonElement, auto?: boolean) {
		if (auto && noAutoSave) return;

		const keys = Object.keys(data);
		for (const k of keys) {
			localStorage.setItem('editor-' + k, JSON.stringify(data[k]));
		}
		btn.disabled = true;
		btn.textContent = 'Saved';
		setTimeout(() => {
			btn.disabled = false;
			btn.textContent = 'Save';
		}, 2500);
	}
}
