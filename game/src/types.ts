export interface Choice {
	id: number;
	text: string;
	targetDialogueID: number;
}
export interface Dialogue {
	id: number;
	text: string;
	backgroundID: number;
	characterID: number;
	characterFrameIndex: number;
	/** Array of choice IDs */
	choices: number[];
}
export interface Character {
	id: number;
	name: string;
	/** Array of frame IDs */
	frames: number[];
}
export interface Frame {
	id: number;
	name: string;
	imageID: number;
}
export interface Image {
	id: number;
	name: string;
	filename: string;
}
export interface Background {
	id: number;
	name: string;
	imageID: number;
	bgColor: string;
}
export interface Meta {
	version: number;
}
