import * as http from 'http';
import * as fs from 'fs-extra';
import * as path from 'path';
import { URLSearchParams } from 'url';

// running @ editor-server/main.js
const base = path.resolve(__dirname, '../editor');
const editorAssets = path.resolve(__dirname, '../editor-assets');

export default async function routeStatic(
	endpoint: string,
	query: URLSearchParams,
	req: http.IncomingMessage,
	res: http.ServerResponse
) {
	let status = 200;
	let fileType = 'text/plain';
	let content: any;

	if ('/' === endpoint) {
		fileType = 'text/html';
		content = await fs.readFile(path.join(base, 'index.html'), 'utf8');
	}

	if ('/favicon.ico' === endpoint) {
		status = 404;
		content = '';
	}

	if (endpoint.indexOf('/assets') === 0 || endpoint === '/game.html') {
		const p = path.join(base, endpoint.substr(1)); // path to default assets
		const p2 = path.join(editorAssets, endpoint.replace(/^\/assets\//, '')); // path to editor-assets

		fileType = mimeFromExtension(endpoint.match(/\.(.+)$/)[1]);

		try {
			// try to load from editor-assets first
			if (/png|jpe?g$/i.test(endpoint)) {
				content = await fs.readFile(p2);
			} else {
				content = await fs.readFile(p2, 'utf8');
			}
		} catch (e) {
			// use defaults otherwise
			if (/png|jpe?g$/i.test(endpoint)) {
				content = await fs.readFile(p);
			} else {
				content = await fs.readFile(p, 'utf8');
			}
		}
	}

	if (content === undefined) return;

	res.writeHead(status, { 'content-type': fileType });
	res.write(content);
	res.end();
}

function mimeFromExtension(ext: string) {
	if (ext === 'jpg') ext = 'jpeg';

	switch (ext) {
		case 'png':
		case 'jpeg':
		case 'gif': { return 'image/' + ext; }
		case 'js': { return 'text/javascript'; }
		case 'json': { return 'application/json'; }
		case 'css': { return 'text/css'; }
		case 'html': { return 'text/html'; }
		default: { return 'text/plain'; }
	}
}
