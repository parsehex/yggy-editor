interface DialogueChoice {
	text: string;
	targetDialogueIndex: number;
}
interface Dialogue {
	text: string;
	image?: string;
	choices: DialogueChoice[];
}

const dialogue: Dialogue[] = [
	{
		image: 'room',
		text: "Hi, how are you?",
		choices: [
			{ text: "Fine...", targetDialogueIndex: 1 },
			{ text: "I'm doing fantastic!", targetDialogueIndex: 1 },
			{ text: "I am ambivalent.", targetDialogueIndex: 2 },
		],
	},
	{
		text: "I don't really have anything else to say to you.",
		choices: [],
	},
	{
		text: "What does \"ambivalent\" mean?",
		choices: [
			{
				text: "It's like being neutral; not having any strong feelings one way or another.",
				targetDialogueIndex: 1,
			},
		],
	},
];

export default dialogue;
