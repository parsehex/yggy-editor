import { getDB } from './db';
import workerSetup from './worker-setup';

workerSetup();

self.addEventListener('fetch', async (event) => {
	const ev = event as FetchEvent;
	const url = new URL(ev.request.url);

	if (url.pathname.startsWith('/api/')) {
		ev.respondWith(handleAPIRequest(ev.request));
		return;
	}

	if (url.pathname.startsWith('/game-data/')) {
		ev.respondWith(handleGameDataRequest(ev.request));
		return;
	}

	ev.respondWith(fetch(ev.request));
});

async function handleGameDataRequest(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const db = await getDB();

	// Handle data JSON files (e.g., /game-data/data/dialogue.json)
	const dataMatch = url.pathname.match(/\/game-data\/data\/(.+)\.json$/);
	if (dataMatch) {
		const type = dataMatch[1];
		try {
			const data = await db.get(type, 'data');
			return jsonResponse(data || {});
		} catch (error) {
			console.error(`Error getting ${type} data:`, error);
			return jsonResponse({ error: `Failed to get ${type} data` }, 500);
		}
	}

	// Handle image files (e.g., /game-data/images/some-image.png)
	const imageMatch = url.pathname.match(/\/game-data\/images\/(.+)$/);
	if (imageMatch) {
		const filename = imageMatch[1];
		try {
			const imageBlob = await db.get('uploadedImages', filename);
			if (imageBlob) {
				return new Response(imageBlob, {
					headers: { 'Content-Type': imageBlob.type },
				});
			} else {
				return new Response('Image not found', { status: 404 });
			}
		} catch (error) {
			console.error(`Error getting image ${filename}:`, error);
			return new Response('Failed to get image', { status: 500 });
		}
	}

	return new Response('Game data not found', { status: 404 });
}

// The idea is to act as the server did, allowing the editor to
// save or load its data, only we're ultimately using an indexeddb
// instead. This way we can avoid changing the editor.
async function handleAPIRequest(request: Request): Promise<Response> {
	console.debug('serving api request', request);
	const url = new URL(request.url);
	const method = request.method;
	const db = await getDB();

	// examples
	// GET /game-data/data/characters.json
	// GET /game-data/data/choices.json
	// GET /game-data/data/dialogue.json
	// etc.

	if (method === 'GET') {
		switch (url.pathname) {
			case '/api/get': {
				const type = url.searchParams.get('type');
				if (!type)
					return jsonResponse({ error: 'Missing type parameter' }, 400);

				try {
					const data = await db.get(type, 'data');
					return jsonResponse(data || {});
				} catch (error) {
					console.error('Error getting data:', error);
					return jsonResponse({ error: 'Failed to get data' }, 500);
				}
			}

			case '/api/get-images': {
				try {
					const uploadedImages = await db.getAllKeys('uploadedImages');
					// For now, return empty array since we don't have default images in SW
					return jsonResponse(uploadedImages);
				} catch (error) {
					console.error('Error getting images:', error);
					return jsonResponse({ error: 'Failed to get images' }, 500);
				}
			}

			case '/api/version': {
				return new Response('1.0.0', {
					headers: { 'Content-Type': 'text/plain' },
				});
			}

			default:
				return jsonResponse({ error: 'Endpoint not found' }, 404);
		}
	} else if (method === 'POST') {
		switch (url.pathname) {
			case '/api/save': {
				try {
					const body = await request.json();
					const { type, data } = body;

					if (!type || !data) {
						return jsonResponse({ error: 'Missing type or data' }, 400);
					}

					await db.put(type, data, 'data');
					return new Response('OK');
				} catch (error) {
					console.error('Error saving data:', error);
					return jsonResponse({ error: 'Failed to save data' }, 500);
				}
			}

			case '/api/upload-image': {
				try {
					const filename = url.searchParams.get('filename');
					if (!filename) {
						return jsonResponse({ error: 'Missing filename' }, 400);
					}

					const arrayBuffer = await request.arrayBuffer();
					await db.put('uploadedImages', arrayBuffer, filename);

					return new Response(filename);
				} catch (error) {
					console.error('Error uploading image:', error);
					return jsonResponse({ error: 'Failed to upload image' }, 500);
				}
			}

			default:
				return jsonResponse({ error: 'Endpoint not found' }, 404);
		}
	}

	return jsonResponse({ error: 'Method not allowed' }, 405);
}

function jsonResponse(data: any, status = 200): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}
