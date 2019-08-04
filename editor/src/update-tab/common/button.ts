import { createElement } from 'dom-util';

export default function createButton(className: string, text: string) {
	const btn = createElement('button');
	btn.type = 'button';
	btn.className = className;
	btn.textContent = text;
	return btn;
}
