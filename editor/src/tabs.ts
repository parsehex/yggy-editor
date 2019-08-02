import _editorDelegate from 'delegate';
import updateActiveTab from 'update-tab';
import { querySelector } from 'dom-util';

const tabsListContainer = document.getElementById('tabs-list');

export function initTabs() {
	const lsTab = localStorage.getItem('editor-opened-tab');
	if (lsTab) {
		setTimeout(() => {
			const tabButton = querySelector(`#tabs-list span.link[data-target="${lsTab}"]`);
			if (tabButton) tabButton.click();
		}, 0);
	}

	_editorDelegate('#tabs-list span.link', 'click', (e, t: HTMLButtonElement) => {
		// deactivate last tab
		document.querySelector('.tab.active').classList.remove('active');
		tabsListContainer.querySelector('.active').classList.remove('active');

		const tabId = t.dataset.target + '-tab';
		const tab = document.getElementById(tabId);
		tab.classList.add('active');
		t.classList.add('active');

		localStorage.setItem('editor-opened-tab', t.dataset.target);

		updateActiveTab();
	});
}
