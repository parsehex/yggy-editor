import data from 'game/data';
import loadData from 'game/data/load';

export default async function _editorLoadData() {
	console.log('Loading data...');
	const keys = Object.keys(data);
	let loadedData: any = {};

	let broken = false;
	for (const k of keys) {
		const v = localStorage.getItem('editor-' + k);
		if (!v) broken = true;
		loadedData[k] = JSON.parse(v);
	}

	if (broken) {
		await loadData();
	} else {
		Object.assign(data, loadedData);
		console.log('Data loaded from local storage.');
	}
}
