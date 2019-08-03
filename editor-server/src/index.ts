import * as http from 'http';
import routeStatic from './static-router';
import routeAPI from './api';

let port: any = process.argv[2];
if (!port) port = 8081;

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

	await routeStatic(req, res);
	if (res.finished) return;

	await routeAPI(req, res);
	if (res.finished) return;

	res.writeHead(404);
	res.write('Unknown endpoint');
	res.end();
});

server.listen(port, () => console.log(`Editor server running on ${port}`));
