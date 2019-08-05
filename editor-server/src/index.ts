import * as http from 'http';
import routeStatic from './static-router';
import routeAPI from './api';
import { URL } from 'url';
import updateDataAssets from 'update-assets';

let port: any = process.argv[2];
if (!port) port = 8080;

const ipWhitelist = ['127.0.0.1', '75.71.190.242', '174.101.110.149'];
const server = http.createServer(async (req, res) => {
	let foundIp = false;
	const reqIp = req.headers['x-real-ip'] || req.connection.remoteAddress;
	for (const ip of ipWhitelist) {
		if (reqIp.indexOf(ip) > -1) foundIp = true;
	}

	if (!foundIp) {
		res.writeHead(403);
		res.write('IP Address not in whitelist');
		res.end();
		return;
	}

	// the host doesn't really matter for routing these requests
	const url = new URL('http://localhost' + req.url);

	await routeStatic(url.pathname.toLowerCase(), url.searchParams, req, res);
	if (res.finished) return;

	await routeAPI(url.pathname.toLowerCase(), url.searchParams, req, res);
	if (res.finished) return;

	res.writeHead(404);
	res.write('Unknown endpoint');
	res.end();
});

(async () => {
	await updateDataAssets();

	server.listen(port, () => console.log(`Editor server running on ${port}`));
})();
