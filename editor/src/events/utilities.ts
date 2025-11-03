import _editorDelegate from 'delegate';
import data from 'game/data';
import remove from 'data/remove';

export default function initUtilitiesTabEvents() {
	const tab = '#utilities-tab';

	// remove orphans
	_editorDelegate(`${tab} button.remove-orphans`, 'click', () => {
		// TODO this won't clear branches that aren't accessible
		// without having to run multiple times
		const orphanDialogueIds = data.dialogue.map((d) => d.id);
		orphanDialogueIds.splice(0, 1);
		for (const c of data.choices) {
			const di = orphanDialogueIds.indexOf(c.targetDialogueID);
			if (di > -1) orphanDialogueIds.splice(di, 1);
		}
		for (const oid of orphanDialogueIds) {
			remove.dialogue(oid);
		}

		const orphanChoiceIds = data.choices.map((c) => c.id);
		for (const d of data.dialogue) {
			for (const c of d.choices) {
				const ci = orphanChoiceIds.indexOf(c);
				if (ci > -1) orphanChoiceIds.splice(ci, 1);
			}
		}
		for (const oid of orphanChoiceIds) {
			remove.choice(oid);
		}

		// TODO remove orphan frames
	});

	_editorDelegate(`${tab} button.reset-everything`, 'click', async () => {
		if (
			!confirm(
				'Are you sure you want to reset everything? This cannot be undone.'
			)
		)
			return;

		localStorage.clear();
		navigator.serviceWorker.controller.postMessage('clear-idb');
		// location.reload();
	});
}
