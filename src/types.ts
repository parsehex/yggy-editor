export interface DialogueChoice {
	text: string;
	targetDialogueIndex: number;
}
export interface Dialogue {
	text: string;
	image?: string;
	character: string;
	/** Array of choice indices */
	choices: number[];
}
export interface Character {
	name: string;
	imageFilename: string;
}
export interface Img {
	name: string;
	filename: string;
	bgColor: string;
}
