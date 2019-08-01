import { createElement } from 'dom-util';
import data from 'game/data';

/**
 * Returns a `<select>` of Images. `datasetID` should be the ID of the thing to set an image for.
 * 
 * The `<select>`'s className will be "image".
 * 
 * Optionally pass an ImageID for the initial value.
 */
export default function getImagesSelect(datasetID: number, initialValue?: number) {
	const select = createElement('select');
	select.className = 'image';
	select.dataset.id = datasetID.toString();

	for (const img of data.images) {
		const option = createElement('option');
		option.value = img.id.toString();
		option.textContent = img.name;
		select.append(option);
	}

	if (initialValue !== undefined) select.value = initialValue.toString();
	return select;
}
