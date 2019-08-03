import { createElement } from 'dom-util';

interface SelectOption {
	text: string;
	/** If none provided then `text` value is used */
	value?: string;
}
export default function select(
	className: string,
	options: SelectOption[],
	initialValue?: number
) {
	const select = createElement('select');
	select.className = className;

	for (const o of options) {
		const option = createElement('option');
		option.value = o.value !== undefined ? o.value : o.text;
		option.textContent = o.text;
		select.append(option);
	}

	if (initialValue !== undefined) select.value = initialValue.toString();
	return select;
}
