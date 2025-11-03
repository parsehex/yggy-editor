import { register } from 'register-service-worker';

export function initServiceWorker(): Promise<void> {
	return new Promise((resolve, reject) => {
		const log = console.log.bind(console);
		const error = console.error.bind(console);
		register('/service-worker.js', {
			registrationOptions: { scope: './', type: 'module' },
			registered(registration) { log('Service worker has been registered.') },
			ready(registration) { log('Service worker is active.'); resolve(); },
			cached(registration) { log('Content has been cached for offline use.') },
			updatefound(registration) { log('New content is downloading.') },
			updated(registration) { log('New content is available; please refresh.') },
			offline() { log('No internet connection found. App is running in offline mode.') },
			error(err) { error('Error during service worker registration:', err); reject(); },
		});
	});
}