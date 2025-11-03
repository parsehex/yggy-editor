import { getDB } from './db';

export default function workerSetup() {
	self.addEventListener('install', (event) => {
		console.log('Service worker installing');
		event.waitUntil(seedDatabase());
		self.skipWaiting();
	});

	self.addEventListener('activate', (event) => {
		console.log('Service worker activating');
		event.waitUntil(clients.claim());
	});
}

async function seedDatabase() {
	const db = await getDB();

	const dataTypes = [
		'dialogue',
		'images',
		'choices',
		'characters',
		'backgrounds',
		'frames',
		'meta',
	];
	const dataPromises = dataTypes.map(async (type) => {
		const response = await fetch(`/default-game-data/data/${type}.json`);
		const data = await response.json();
		await db.put(type, data, 'data');
	});

	// Seed default images
	const imageListResponse = await fetch('/default-game-data/images/list.json');
	const imageList: string[] = await imageListResponse.json();

	const imagePromises = imageList.map(async (imageName) => {
		const response = await fetch(`/default-game-data/images/${imageName}`);
		const blob = await response.blob();
		await db.put('uploadedImages', blob, imageName);
	});

	await Promise.all([...dataPromises, ...imagePromises]);
	console.log('Database seeded with default game data.');
}
