import updateData from 'common/update-data';

// keys that aren't part of the game data
const keyBlacklist = ['editor-opened-tab'];

/** Should be run before loading. */
export default function updateLocalData() {
	const localData = <any>{};

	const lsKeys: string[] = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (keyBlacklist.indexOf(key) > -1) continue;
		lsKeys.push(key);
	}

	for (const k of lsKeys) {
		const d = JSON.parse(localStorage.getItem(k));
		const key = k.replace('editor-', '');
		localData[key] = d;
	}

	const newData = updateData(localData);

	console.log('Migrated local data to new version. Saving...');

	if (newData === localData) return;

	const newKeys = Object.keys(newData);
	for (const k of newKeys) {
		const lsKey = 'editor-' + k;
		const d = JSON.stringify(newData[k]);
		localStorage.setItem(lsKey, d);
	}

	console.log('Saved.');
}
