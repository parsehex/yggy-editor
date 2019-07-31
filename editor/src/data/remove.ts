import lookup from 'game/lookup';
import data from 'game/data';

function choice(id: number) {
	const c = lookup.choice(id);
	data.choices.splice(data.choices.indexOf(c), 1);

	// remove id from all choices lists
	for (const d of data.dialogue) {
		if (d.choices.indexOf(id) > -1) {
			d.choices.splice(d.choices.indexOf(id), 1);
		}
	}
}

export default { choice };
