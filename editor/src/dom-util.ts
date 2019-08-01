/** Set state of `.disabled` */
export function disabled(el: any, state: boolean) {
	if (!Array.isArray(el)) el = [el];
	for (const e of el) {
		e.disabled = state;
	}
}

export function querySelector<E extends HTMLElement = HTMLElement>(selectors: string): E | null {
	return document.querySelector(selectors);
}

export function createElement<K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] {
	return document.createElement(tagName);
}
