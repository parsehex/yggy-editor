import * as http from 'http';
import * as fs from 'fs-extra';
import * as path from 'path';
import { editorAssetsBase, assetsBase } from 'const';

let version = 'Error';
(async () => {
	const pkg = await fs.readFile(path.resolve(__dirname, '../package.json'), 'utf8');
	version = JSON.parse(pkg).version;
})();

interface SaveBody {
	type: 'dialogue' | 'characters' | 'images' | 'choices';
	data: any;
}

export default async function routeAPI(
	endpoint: string,
	query: URLSearchParams,
	req: http.IncomingMessage,
	res: http.ServerResponse
) {
	if (endpoint.indexOf('/api') !== 0) return;

	// writing conditions backwards to be easier to spot

	if ('/api/save' === endpoint) {
		const body: SaveBody = await parseBody(req, true);
		const p = path.join(editorAssetsBase, `data/${body.type}.json`);
		const c = JSON.stringify(body.data);
		await fs.writeFile(p, c, { encoding: 'utf8' });
		res.writeHead(200);
		res.write('OK');
		res.end();
	}

	if ('/api/get' === endpoint) {
		// the api is fragile, please don't hurt it
		const p = path.join(editorAssetsBase, `data/${query.get('type')}.json`);
		const c = await fs.readFile(p, 'utf8');
		res.writeHead(200, { 'content-type': 'application/json' });
		res.write(c);
		res.end();
	}

	// return list of images present in default and editor assets directories
	if ('/api/get-images' === endpoint) {
		const imagesDir = path.join(assetsBase, 'images');
		const imagesDir2 = path.join(editorAssetsBase, 'images');

		const images = await fs.readdir(imagesDir);
		const images2 = await fs.readdir(imagesDir2);

		const list = images.slice();

		for (const i of images2) {
			if (images.indexOf(i) === -1) list.push(i);
		}

		const c = JSON.stringify(list);
		res.writeHead(200, { 'content-type': 'application/json' });
		res.write(c);
		res.end();
	}

	if ('/api/upload-image' === endpoint) {
		// the api is fragile, please don't hurt it
		let fileName = query.get('filename');
		if (fileName.indexOf('.png') === -1) fileName += '.png';

		const p = path.join(editorAssetsBase, 'images/' + fileName);
		const ws = fs.createWriteStream(p);
		req.pipe(ws);
		res.writeHead(200);
		res.write('OK');
		res.end();
	}

	if ('/api/version' === endpoint) {
		res.writeHead(200, { 'content-type': 'text/plain' });
		res.write(version);
		res.end();
	}
}

function parseBody(req: http.IncomingMessage, json?: boolean): Promise<any> {
	return new Promise((resolve) => {
		let body = '';

		if (json) req.setEncoding('utf8');

		req.on('data', (chunk) => body += chunk);
		req.on('end', () => {
			const val = json ? JSON.parse(body) : body;
			resolve(val);
		});
	});
}
