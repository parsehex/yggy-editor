import data, { GameData } from './index';

// the return type is a little bit hacky-looking for my taste but it's simple
// use the index to set the return type to the type of the array elements
// exclude "meta" since it's an object and has no IDs
export default function getData<T extends Exclude<keyof GameData, 'meta'>>(
	type: T,
	id: number
): GameData[T][0] {
	const list = data[type];

	// this is used a lot; use normal for loop
	for (let i = 0; i < list.length; i++) {
		if (list[i].id === id) return list[i];
	}
	return null;
}
