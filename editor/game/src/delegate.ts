import elements from './elements';

type EventType = 'click' | 'input' | 'change' |
	'contextmenu' | 'keyup' | 'focusout' |
	'mouseover' | 'mousemove' | 'mouseout';

interface Listener {
	eventName: EventType;
	handler: (ev: Event, target: HTMLElement) => void;
	selector: string;
}

const listeners: Listener[] = [];

let setup = false;

export default function delegate(
	selector: string,
	eventNames: EventType | EventType[],
	handler: Listener['handler']
) {
	if (!setup) init();

	if (!Array.isArray(eventNames)) eventNames = [eventNames];

	for (const eventName of eventNames) {
		listeners.push({ selector, eventName, handler });
	}
}

function init() {
	elements.doc.body.addEventListener('click', eventHandler.bind(null, 'click'));
	elements.doc.body.addEventListener('input', eventHandler.bind(null, 'input'));
	elements.doc.body.addEventListener('change', eventHandler.bind(null, 'change'));
	elements.doc.body.addEventListener('contextmenu', eventHandler.bind(null, 'contextmenu'));
	elements.doc.body.addEventListener('keyup', eventHandler.bind(null, 'keyup'));
	elements.doc.body.addEventListener('focusout', eventHandler.bind(null, 'focusout'));
	elements.doc.body.addEventListener('mouseover', eventHandler.bind(null, 'mouseover'));
	elements.doc.body.addEventListener('mousemove', eventHandler.bind(null, 'mousemove'));
	elements.doc.body.addEventListener('mouseout', eventHandler.bind(null, 'mouseout'));
	setup = true;
}

function eventHandler(type: Listener['eventName'], e: Event) {
	const target = e.target as HTMLElement;

	for (const listener of listeners) {
		if (listener.eventName !== type) continue;
		if (!target.matches(listener.selector)) continue;

		listener.handler(e, target);
	}
}
