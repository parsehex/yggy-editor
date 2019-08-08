import * as http from 'http';
import * as fs from 'fs-extra';
import * as path from 'path';
import { URLSearchParams } from 'url';
import { editorBase, editorAssetsBase, gameBase } from 'const';

export default async function routeStatic(
	endpoint: string,
	query: URLSearchParams,
	req: http.IncomingMessage,
	res: http.ServerResponse
) {
	let status = 200;
	let fileType = 'text/plain';
	let content: any;

	// /index.html
	if (endpoint === '/') {
		fileType = 'text/html';
		content = await fs.readFile(path.join(editorBase, 'index.html'), 'utf8');
	}

	// /game.html
	if (endpoint === '/game.html') {
		fileType = 'text/html';
		const p = path.join(gameBase, 'index.html');
		content = await fs.readFile(p, 'utf8');
	}

	// /favicon.ico
	if (endpoint === '/favicon.ico') {
		status = 404;
		content = '';
	}

	// /assets/*
	if (endpoint.indexOf('/assets') === 0) {
		// TODO this isn't an amazing test:
		const isGameAsset = endpoint.indexOf('game.') > -1;

		let filepath = endpoint.replace(/^\/assets\//, '');
		let p: string;
		if (!isGameAsset || filepath.indexOf('game.js') > -1) {
			// the editor script acts as a no-op when the game tries to load it
			if (filepath.indexOf('game.js')) filepath = filepath.replace('game', 'editor');

			p = path.join(editorBase, 'assets', filepath);
		} else {
			p = path.join(gameBase, 'assets', filepath);
		}

		try {
			if (/png|jpe?g|gif$/i.test(endpoint)) {
				content = await fs.readFile(p);
			} else {
				// only load text files with utf8 encoding
				content = await fs.readFile(p, 'utf8');
			}
			fileType = mimeFromFilename(endpoint);
		} catch (e) {
			status = 404;
			content = '';
		}
	}

	// /game-data/*
	if (endpoint.indexOf('/game-data') === 0) {
		const p = path.join(editorAssetsBase, endpoint.replace(/^\/game-data\//, ''));
		try {
			if (/png|jpe?g|gif$/i.test(endpoint)) {
				content = await fs.readFile(p);
			} else {
				// only load text files with utf8 encoding
				content = await fs.readFile(p, 'utf8');
			}
			fileType = mimeFromFilename(endpoint);
		} catch (e) {
			status = 404;
			content = '';
		}
	}

	if (content === undefined) return;

	res.writeHead(status, { 'content-type': fileType });
	res.write(content);
	res.end();
}

function mimeFromFilename(filename: string) {
	let ext = filename.match(/\.(.+)$/)[1];

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
