import { createElement } from 'dom-util';

export type SelectOptions = SelectOption[];
interface SelectOption {
	text: string;
	/** If none provided then `text.toLowerCase()` is used */
	value?: string;
}
export default function createSelect(
	className: string,
	options: SelectOption[],
	initialValue?: number | string
) {
	const select = createElement('select');
	select.className = className;

	for (const o of options) {
		// allow falsey options to be skipped
		if (!o) continue;

		const option = createElement('option');
		option.value = o.value !== undefined ? o.value : o.text.toLowerCase();
		option.textContent = o.text;
		select.append(option);
	}

	if (initialValue !== undefined) select.value = initialValue + '';
	return select;
}
