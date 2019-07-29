export interface Dialogue {
	node: joint.shapes.standard.Rectangle;
	text: string;
	choices: number[];
}
export interface Choice {
	node: joint.shapes.standard.Ellipse;
	text: string;
	nextDialogue: number;
}

const dialogue: Dialogue[] = [
	{
		text: 'Hi',
		choices: [0],
		node: null,
	},
];
const choices: Choice[] = [
	{
		text: 'no',
		nextDialogue: null,
		node: null,
	},
	{
		text: 'yes',
		nextDialogue: null,
		node: null,
	},
];

const graph = new joint.dia.Graph();

const objects: joint.dia.Element[] = [];

export default {
	dialogue,
	choices,
	graph,
	objects,
	adding: false,
	addingType: null,
};
