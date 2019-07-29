import { Dialogue } from '../types';

const dialogue: Dialogue[] = [
	{
		character: 'Green Man',
		image: 'room',
		text: "Hi, how are you?",
		choices: [
			{ text: "Fine...", targetDialogueIndex: 1 },
			{ text: "I'm doing fantastic!", targetDialogueIndex: 1 },
			{ text: "I can't remember anything. I woke up today naked.", targetDialogueIndex: 1 },
			{ text: "I am ambivalent.", targetDialogueIndex: 2 },
		],
	},
	{
		character: 'Green Man',
		text: "I don't really have anything else to say to you.",
		choices: [],
	},
	{
		character: 'Green Man',
		text: "What does \"ambivalent\" mean?",
		choices: [
			{
				text: "I don't know.",
				targetDialogueIndex: 1,
			},
			{
				text: "It's like being neutral; not having any strong feelings one way or another.",
				targetDialogueIndex: 3,
			},
		],
	},
	{
		character: 'Green Man',
		text: "Huh.",
		choices: [],
	},
];

export default dialogue;
