interface Elements {
	doc: Document;
	bg: HTMLDivElement;
	charName: HTMLDivElement;
	charImg: HTMLDivElement;
	dialogueText: HTMLDivElement;
	choicesDiv: HTMLDivElement;
}

const elements: Elements = {
	// this is to make it easier for the editor to hook in
	doc: document,
	bg: null,
	charName: null,
	charImg: null,
	dialogueText: null,
	choicesDiv: null,
};

export default elements;

export function initElements() {
	elements.bg = <HTMLDivElement>elements.doc.getElementById('background');
	elements.charName = <HTMLDivElement>elements.doc.getElementById('character-name');
	elements.charImg = <HTMLDivElement>elements.doc.getElementById('character');
	elements.dialogueText = <HTMLDivElement>elements.doc.querySelector('#dialogue-box .text');
	elements.choicesDiv = <HTMLDivElement>elements.doc.getElementById('choices');
}
