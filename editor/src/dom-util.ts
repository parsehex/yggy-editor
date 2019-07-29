/** Set state of `.disabled` */
export function disabled(el: any, state: boolean) {
	if (!Array.isArray(el)) el = [el];
	for (const e of el) {
		e.disabled = state;
	}
}
