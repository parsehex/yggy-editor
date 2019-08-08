import * as faker from 'faker';

export function ran(min: number, max: number) {
	return faker.random.number({ min, max });
}
export function pick<T>(arr: T[]): T {
	const i = faker.random.number({ min: 0, max: arr.length - 1 });
	return arr[i];
}
export function chance(percent: number) {
	const n = faker.random.number({ min: 1, max: 100 });
	return n <= percent;
}
