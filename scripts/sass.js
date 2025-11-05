const path = require('path');
const parallel = require('./parallel');

const base = path.resolve(__dirname, '../');

const cmd = process.argv[2];

if (cmd !== 'build' && cmd !== 'watch') {
	console.log('Pass "watch" or "build" as first argument');
	process.exit(1);
}

const defaultEntries = ['editor/game'];
const commands = defaultEntries.map(makeCmd);

if (process.argv.length > 3) {
	commands.length = 0;

	for (let i = 2; i < process.argv.length; i++) {
		const script = process.argv[i].toLowerCase();

		if (defaultEntries.indexOf(script) === -1) continue;

		commands.push(makeCmd(script));
	}
}

function makeCmd(s) {
	const pieces = s.split('/');
	const name = pieces[pieces.length - 1];
	const i = path.join(base, `${s}/scss/main.scss`);
	const o = path.join(base, `editor/public/assets/${name}.css`);
	const opt = cmd === 'watch' ? '--watch' : '--style=compressed';
	return {
		name: s.toUpperCase(),
		prefixColor: 'magenta',
		command: `sass ${opt} ${i} ${o}`,
	};
}

parallel(commands);
