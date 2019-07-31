export interface DialogueChoice {
	id: number;
	text: string;
	targetDialogueID: number;
}
export interface Dialogue {
	id: number;
	text: string;
	imageID: number;
	characterID: number;
	/** Array of choice IDs */
	choices: number[];
}
export interface Character {
	id: number;
	name: string;
	imageFilename: string;
}
export interface Img {
	id: number;
	name: string;
	filename: string;
	bgColor: string;
}
