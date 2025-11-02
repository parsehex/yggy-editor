import { createElement } from 'dom-util';

export default function createSpan(className: string, text: string) {
	const btn = createElement('span');
	btn.className = className;
	btn.textContent = text;
	return btn;
}
