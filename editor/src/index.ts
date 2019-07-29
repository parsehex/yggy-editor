import './buttons';
import state from './state';
import { addDialogue, addChoice } from './objects';

const paper = new joint.dia.Paper({
	// @ts-ignore
	el: document.getElementById('paper'),
	width: 850,
	height: 600,
	model: state.graph,
	gridSize: 1,
	snapLinks: true,
	linkPinning: false,
	embeddingMode: true,
	clickThreshold: 5,
	defaultConnectionPoint: { name: 'boundary' },
	validateConnection: function (sourceView, sourceMagnet, targetView, targetMagnet) {
		return sourceMagnet != targetMagnet;
	}
});
paper.on('cell:pointerdown', console.log);
console.log(state.graph);

const d = state.dialogue;
for (const dia of d) {
	addDialogue(dia);
}

const c = state.choices;
for (const ch of c) {
	addChoice(ch);
}

var l1 = new joint.shapes.standard.Link({
	// source: { id: a.id },
	// target: { id: b.id },
	attrs: {
		line: {
			strokeWidth: 2,
		},
	},
	labels: [{
		position: {
			distance: 0.5,
			offset: ('test'.indexOf('\n') > -1 || 'test'.length === 1) ? 0 : 10,
			args: {
				keepGradient: true,
				ensureLegibility: true
			},
		},
		attrs: {
			text: { text: 'test' },
		},
	}],
	vertices: [],
});

// state.graph.addCells([a, b, c, l1, l2]);
