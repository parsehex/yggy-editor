import * as http from 'http';
import * as fs from 'fs-extra';
import * as path from 'path';

// running @ editor-server/main.js
const base = path.resolve(__dirname, '../editor');
const editorAssets = path.resolve(__dirname, '../editor-assets');

export default async function routeStatic(req: http.IncomingMessage, res: http.ServerResponse) {
	let status = 200;
	let fileType = 'text/plain';
	let content: any;

	if (req.url === '/') {
		fileType = 'text/html';
		content = await fs.readFile(path.join(base, 'index.html'), 'utf8');
	}

	if (/^\/assets/i.test(req.url) || req.url.toLowerCase() === '/game.html') {
		const p = path.join(base, req.url.substr(1));
		const p2 = path.join(editorAssets, req.url.replace(/^\/assets\//, ''));

		fileType = mimeFromExtension(req.url.match(/\.(.+)$/)[1]);

		try {
			// try to load from editor-assets first
			if (/png|jpe?g$/i.test(req.url)) {
				content = await fs.readFile(p2);
			} else {
				content = await fs.readFile(p2, 'utf8');
			}
		} catch (e) {
			// use defaults otherwise
			if (/png|jpe?g$/i.test(req.url)) {
				content = await fs.readFile(p);
			} else {
				content = await fs.readFile(p, 'utf8');
			}
		}
	}

	if (!content) return;

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
