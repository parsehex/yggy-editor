export interface DialogueChoice {
	text: string;
	targetDialogueIndex: number;
}
export interface Dialogue {
	text: string;
	image?: string;
	character: string;
	choices: DialogueChoice[];
}
