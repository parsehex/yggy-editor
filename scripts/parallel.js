const pll = require('pll');
const chalk = require('chalk');

module.exports = function (cmds) {
	function out(d) {
		const prefix = `${chalk[this.color](`${this.name}`)}${chalk.default.reset('')}`;
		console.log(`[${prefix}]: ${d.trim()}`);
	}

	const c = [];
	for (let i = 0; i < cmds.length; i++) {
		const cmd = cmds[i];
		c.push({
			command: cmd.command,
			onOutput: out.bind({ name: cmd.name, color: cmd.prefixColor }),
			onError: out.bind({ name: cmd.name, color: cmd.prefixColor }),
		});
	}

	pll(c);
}
