import data from 'game/data';
import loadData from 'game/data/load';
import editorState from 'state';

export default async function _editorLoadData() {
	const keys = Object.keys(data);
	const loadedData: any = {};

	let broken = false;
	for (const k of keys) {
		const v = localStorage.getItem('editor-' + k);
		if (!v) broken = true;
		loadedData[k] = JSON.parse(v);
	}

	const devMode = editorState.devMode;
	// const devMode = editorState.devMode && false;
	if (broken || devMode) {
		console.log('Allowing game to load data...');
		await loadData();
	} else {
		Object.assign(data, loadedData);
		console.log('Loaded data from local storage.');
	}
	console.log('Game data:', data);
	(<any>window).data = data;
}
