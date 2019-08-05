import * as fs from 'fs-extra';
import * as path from 'path';
import { editorAssetsBase } from 'const';
import updateData from 'common/update-data';

export default async function updateDataAssets() {
	const dataAssetsPath = path.join(editorAssetsBase, 'data');
	const dataAssetFiles = await fs.readdir(dataAssetsPath);

	const data = <any>{};
	for (const f of dataAssetFiles) {
		const d = JSON.parse(await fs.readFile(path.join(dataAssetsPath, f), 'utf8'));
		const key = f.replace('.json', '');
		data[key] = d;
	}

	const migratedData = updateData(data);

	if (migratedData === data) return;

	console.log('Migrated editor assets data to new version. Saving...');

	// TODO may want to backup
	// TODO may also want to clear the whole data directory

	const newKeys = Object.keys(migratedData);
	for (const k of newKeys) {
		const p = path.join(dataAssetsPath, k + '.json');
		const c = JSON.stringify(migratedData[k]);
		await fs.writeFile(p, c, { encoding: 'utf8' });
	}

	console.log('Saved.');
}
