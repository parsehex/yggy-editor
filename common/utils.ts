export function clone<T>(d: T): T {
	return JSON.parse(JSON.stringify(d));
}
