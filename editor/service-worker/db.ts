import { IDBPDatabase, openDB } from 'idb';

const DB_NAME = 'yggy-editor-db';
const DB_VERSION = 1;
let db: IDBPDatabase | null = null;

export async function getDB() {
	if (db) return db;
	const dbPromise = await openDB(DB_NAME, DB_VERSION, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('dialogue')) {
				db.createObjectStore('dialogue');
			}
			if (!db.objectStoreNames.contains('choices')) {
				db.createObjectStore('choices');
			}
			if (!db.objectStoreNames.contains('characters')) {
				db.createObjectStore('characters');
			}
			if (!db.objectStoreNames.contains('images')) {
				db.createObjectStore('images');
			}
			if (!db.objectStoreNames.contains('backgrounds')) {
				db.createObjectStore('backgrounds');
			}
			if (!db.objectStoreNames.contains('frames')) {
				db.createObjectStore('frames');
			}
			if (!db.objectStoreNames.contains('meta')) {
				db.createObjectStore('meta');
			}
			if (!db.objectStoreNames.contains('uploadedImages')) {
				db.createObjectStore('uploadedImages');
			}
		},
	});
	db = dbPromise;
	return db;
}
