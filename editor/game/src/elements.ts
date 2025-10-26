interface Elements {
	doc: Document;
	bg: HTMLDivElement;
	charName: HTMLDivElement;
	char1Img: HTMLImageElement;
	char2Img: HTMLImageElement;
	dialogueText: HTMLDivElement;
	choicesDiv: HTMLDivElement;
	continueInd: HTMLDivElement;
}

const elements: Elements = {
	doc: null,
	bg: null,
	charName: null,
	char1Img: null,
	char2Img: null,
	dialogueText: null,
	choicesDiv: null,
	continueInd: null,
};

export default elements;

export function initElements() {
	// if there is an iframe on the page then this must be the editor
	// this is to make it easier for the editor to hook in
	const iframe = document.querySelector('iframe');
	elements.doc = iframe ? iframe.contentDocument : document;

	elements.bg = <HTMLDivElement>elements.doc.getElementById('background');
	elements.charName = <HTMLDivElement>elements.doc.getElementById('character-name');
	elements.char1Img = <HTMLImageElement>elements.doc.getElementById('character1');
	elements.char2Img = <HTMLImageElement>elements.doc.getElementById('character2');
	elements.dialogueText = <HTMLDivElement>elements.doc.querySelector('#dialogue-box .text');
	elements.choicesDiv = <HTMLDivElement>elements.doc.getElementById('choices');
	elements.continueInd = <HTMLDivElement>elements.doc.getElementById('continue-indicator');
}
