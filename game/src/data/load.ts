import data from './index';

export default async function loadData() {
	// console.log('Loading data...');
	const keys = Object.keys(data);
	const requests: Promise<Response>[] = [];

	for (const k of keys) {
		console.log('fetching game data', k);
		const p = fetch(`/game-data/data/${k}.json`);
		requests.push(p);
	}

	const responses = await Promise.all(requests);

	for (const res of responses) {
		const name = res.url.match(/game-data\/data\/(.+)\.json$/)[1];
		const d = await res.json();
		data[name] = d;
	}

	// console.log('Data loaded.');
}
