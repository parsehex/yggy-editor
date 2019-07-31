import * as http from 'http';
import routeStatic from './static-router';
import routeAPI from './api';

const server = http.createServer(async (req, res) => {
	await routeStatic(req, res);
	if (res.finished) return;

	await routeAPI(req, res);
	if (res.finished) return;

	res.writeHead(404);
	res.write('Unknown endpoint');
	res.end();
});

server.listen(8080, () => console.log('Editor server running on 8080'));
