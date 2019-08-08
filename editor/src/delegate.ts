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

export default function _editorDelegate(
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
	document.body.addEventListener('click', eventHandler.bind(null, 'click'));
	document.body.addEventListener('input', eventHandler.bind(null, 'input'));
	document.body.addEventListener('change', eventHandler.bind(null, 'change'));
	document.body.addEventListener('contextmenu', eventHandler.bind(null, 'contextmenu'));
	document.body.addEventListener('keyup', eventHandler.bind(null, 'keyup'));
	document.body.addEventListener('focusout', eventHandler.bind(null, 'focusout'));
	document.body.addEventListener('mouseover', eventHandler.bind(null, 'mouseover'));
	document.body.addEventListener('mousemove', eventHandler.bind(null, 'mousemove'));
	document.body.addEventListener('mouseout', eventHandler.bind(null, 'mouseout'));
	setup = true;
}

function eventHandler(type: Listener['eventName'], e: Event) {
	const target = e.target as HTMLElement;

	for (const listener of listeners) {
		if (listener.eventName !== type) continue;
		if (!target.matches(listener.selector)) continue;

		listener.handler(e, target);
	}

	e.stopImmediatePropagation();
}
