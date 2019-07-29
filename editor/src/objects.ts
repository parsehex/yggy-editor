import state, { Dialogue, Choice } from './state';

function lowestObjectY() {
	let lowestY: number = null;
	for (const o of state.objects) {
		// if (lowestY === null) lowestY = o.position.x;
	}
}

export function addDialogue(d: Dialogue) {
	for (const o of state.objects) {
		// 
	}

	const a = new joint.shapes.devs.Atomic({
		position: { x: 50, y: 50 },
		size: { width: 100, height: 40 },
		inPorts: ['in'],
		outPorts: ['out'],
		attrs: { ".label": { text: d.text } },
	});
	d.node = a;
	state.graph.addCells([a]);
	state.objects.push(a);
}

export function addChoice(c: Choice) {
	const a = new joint.shapes.devs.Atomic({
		position: { x: 250, y: 50 },
		size: { width: 100, height: 40 },
		inPorts: ['in'],
		outPorts: ['out'],
		attrs: { ".label": { text: c.text } },
	});
	c.node = a;
	state.graph.addCells([a]);
	state.objects.push(a);
}
