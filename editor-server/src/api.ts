import * as http from 'http';
import * as fs from 'fs-extra';
import * as path from 'path';

let version = 'Error';
(async () => {
	const pkg = await fs.readFile(path.resolve(__dirname, '../package.json'), 'utf8');
	version = JSON.parse(pkg).version;
})();

const assetsBase = path.resolve(__dirname, '../assets');
const editorAssetsBase = path.resolve(__dirname, '../editor-assets');

interface SaveBody {
	type: 'dialogue' | 'characters' | 'images' | 'choices';
	data: any;
}

export default async function routeAPI(req: http.IncomingMessage, res: http.ServerResponse) {
	if (req.url.indexOf('api') === -1) return;

	if (/api\/save/i.test(req.url)) {
		const body: SaveBody = await parseBody(req, true);
		const p = path.join(editorAssetsBase, `data/${body.type}.json`);
		const c = JSON.stringify(body.data);
		await fs.writeFile(p, c, { encoding: 'utf8' });
		res.writeHead(200);
		res.write('OK');
		res.end();
	}

	if (/api\/get\?type/i.test(req.url)) {
		// the api is fragile, please don't hurt it
		const type = req.url.match(/type=(.+)$/i)[1];
		const p = path.join(editorAssetsBase, `data/${type}.json`);
		const c = await fs.readFile(p, 'utf8');
		res.writeHead(200, { 'content-type': 'application/json' });
		res.write(c);
		res.end();
	}

	// return list of images present in default and editor assets directories
	if (/api\/get-images/i.test(req.url)) {
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

	if (/api\/upload-image/i.test(req.url)) {
		// the api is fragile, please don't hurt it
		const filename = req.url.match(/filename=(.+)$/i)[1];
		const p = path.join(editorAssetsBase, 'images/' + filename);
		const ws = fs.createWriteStream(p);
		req.pipe(ws);
		res.writeHead(200);
		res.write('OK');
		res.end();
	}

	if (/api\/version/i.test(req.url)) {
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
