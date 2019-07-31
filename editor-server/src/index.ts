import * as http from 'http';
import routeStatic from './static-router';
import routeAPI from './api';

const server = http.createServer(async (req, res) => {
	const tryStatic = await routeStatic(req, res);
	if (tryStatic) return;

	const tryAPI = await routeAPI(req, res);
	if (tryAPI) return;

	res.writeHead(404);
	res.write('Unknown endpoint');
	res.end();
});

server.listen(8080, () => console.log('Editor server running on 8080'));
