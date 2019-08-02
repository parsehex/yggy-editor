import data from 'game/data';
import _editorDelegate from 'delegate';
import draw from 'draw';
import { goToPrev, goToNext } from 'navigation';
import editorElements from 'editor-elements';
import { initDialogueTabEvents } from './dialogue';
import initCharactersTabEvents from './characters';
import initBackgroundsTabEvents from './background';
import initImagesTabEvents from './images';
import initTreeTabEvents from './tree';
import initUtilitiesTabEvents from './utilities';

export function initEditorEvents() {
	initDialogueTabEvents();
	initCharactersTabEvents();
	initBackgroundsTabEvents();
	initImagesTabEvents();
	initTreeTabEvents();
	initUtilitiesTabEvents();

	// history previous
	_editorDelegate('button#nav-back', 'click', () => {
		goToPrev();
		draw();
	});

	// history next
	_editorDelegate('button#nav-next', 'click', () => {
		goToNext();
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
