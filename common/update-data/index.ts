import migrate from './migrate';

export const CURRENT_GAME_DATA_VERSION = 2;

/**
 * Given a `data` object, returns an update version of `data`.
 * Returns the same object if no updates are required.
 * 
 * `data` should be an object with a property for each data asset type, without any pre/suffix.
 * For example, the prop 'editor-dialogue' should be changed to 'dialogue' before calling this function.
 */
export default function updateData(data: any) {
	const version = dataVersion(data);

	if (version > CURRENT_GAME_DATA_VERSION) {
		throw new Error('Game Data version is newer than expected. ' +
			'Please go back in time and try again.');
	}

	if (version === CURRENT_GAME_DATA_VERSION) return data;

	// incrementally migrate to current version
	let newData = migrate(data, version);
	while (newData.meta.version < CURRENT_GAME_DATA_VERSION) {
		newData = migrate(newData, newData.meta.version);
	}
	return newData;
}

function dataVersion(data: any) {
	// game data didn't have meta object at first
	if (!data.meta) return 0;

	return data.meta.version;
}
