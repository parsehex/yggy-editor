const path = require('path');
const parallel = require('./parallel');

const base = path.resolve(__dirname, '../');
const tslint = path.join(base, 'tslint.json');

const defaultScripts = [
	'game',
	'editor',
	'editor-server',
];
const commands = defaultScripts.map(makeCmd);

if (process.argv[2]) {
	commands.length = 0;

	for (let i = 2; i < process.argv.length; i++) {
		const script = process.argv[i].toLowerCase();

		if (defaultScripts.indexOf(script) === -1) continue;

		commands.push(makeCmd(script));
	}
}

function makeCmd(script) {
	const p = path.join(base, `${script}/tsconfig.json`);
	return {
		name: script.toUpperCase(),
		prefixColor: 'white',
		command: `tslint -t stylish -c ${tslint} -p ${p}`,
	};
}

parallel(commands);
