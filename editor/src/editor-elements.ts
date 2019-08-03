import { querySelector } from 'dom-util';

export default {
	btnBack: <HTMLButtonElement>querySelector('button#nav-back'),
	btnNext: <HTMLButtonElement>querySelector('button#nav-next'),
	btnPush: <HTMLButtonElement>querySelector('button#push'),
	btnPull: <HTMLButtonElement>querySelector('button#pull'),
	btnSave: <HTMLButtonElement>querySelector('button#save'),
	btnClear: <HTMLButtonElement>querySelector('button#clear'),
	dialogueTab: {
		dialogue: <HTMLTextAreaElement>querySelector('#dialogue-tab textarea.dialogue'),
		choices: <HTMLDivElement>querySelector('#dialogue-tab div.choices'),
		characters: <HTMLDivElement>querySelector('#dialogue-tab div.characters'),
		background: <HTMLSelectElement>querySelector('#dialogue-tab select.background'),
	},
	charactersTab: {
		list: <HTMLDivElement>querySelector('#characters-tab div.list'),
	},
	backgroundsTab: {
		list: <HTMLDivElement>querySelector('#backgrounds-tab div.list'),
	},
	imagesTab: {
		list: <HTMLDivElement>querySelector('#images-tab div.list'),
		previewSelect: <HTMLSelectElement>querySelector('#images-tab #image-file-preview-select'),
		previewImage: <HTMLImageElement>querySelector('#images-tab #image-file-preview'),
		uploadFileName: <HTMLInputElement>querySelector('#images-tab #upload input.name'),
		fileInput: <HTMLInputElement>querySelector('#images-tab input[type="file"]'),
		uploadButton: <HTMLButtonElement>querySelector('#images-tab #upload button.submit'),
	},
	tree: {
		list: <HTMLDivElement>querySelector('#tree-tab > ul'),
		btnUndo: <HTMLButtonElement>querySelector('#tree-tab > div > button.undo'),
	},
};
