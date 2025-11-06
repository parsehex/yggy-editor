import { createElement } from 'dom-util';

export default function createButton(
	className: string,
	text: string,
	title?: string
) {
	const btn = createElement('button');
	btn.type = 'button';
	btn.className = className;
	btn.textContent = text;
	if (title) btn.title = title;
	return btn;
}
