import { Dialogue, Img, DialogueChoice, Character } from './types';

interface Data {
	dialogue: Dialogue[];
	images: Img[];
	choices: DialogueChoice[];
	characters: Character[];
}

const data: Data = {
	dialogue: null,
	images: null,
	choices: null,
	characters: null,
};

export default data;

export async function loadData() {
	console.log('Loading data...');
	const keys = Object.keys(data);
	const requests: Promise<Response>[] = [];

	for (const k of keys) {
		const p = fetch(`/assets/data/${k}.json`);
		requests.push(p);
	}

	const responses = await Promise.all(requests);

	for (const res of responses) {
		const name = res.url.match(/data\/(.+)\.json/)[1];
		const d = await res.json();
		data[name] = d;
	}

	console.log('Data loaded.');
}
