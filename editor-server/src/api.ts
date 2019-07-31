import * as http from 'http';
import * as fs from 'fs-extra';
import * as path from 'path';

const editorAssetsBase = path.resolve(__dirname, '../editor-assets');

interface SaveBody {
	type: 'dialogue' | 'characters' | 'images' | 'choices';
	data: any;
}

export default async function routeAPI(req: http.IncomingMessage, res: http.ServerResponse) {
	if (req.url.indexOf('api') === -1) return false;

	if (/api\/save/i.test(req.url)) {
		const body: SaveBody = await parseBody(req);
		const p = path.join(editorAssetsBase, `data/${body.type}.json`);
		const c = JSON.stringify(body.data);
		await fs.writeFile(p, c, { encoding: 'utf8' });
		res.writeHead(200);
		res.write('OK');
		res.end();
		return true;
	}
}

function parseBody(req: http.IncomingMessage): Promise<any> {
	return new Promise((resolve) => {
		let body = '';

		req.setEncoding('utf8');
		req.on('data', (chunk) => body += chunk);
		req.on('end', () => {
			resolve(JSON.parse(body));
		});
	});
}
