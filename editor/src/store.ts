import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
	const tabs = [
		'dialogue',
		'tree',
		'characters',
		'backgrounds',
		'images',
		'utilities',
	];
	const openedTab = useStorage('editor-opened-tab', tabs[0]);

	return { tabs, openedTab };
});
