import { defineConfig } from 'vitepress';

// @ts-ignore
export default defineConfig(({ mode }) => {
	return {
		title: 'Yggy Docs',
		description: 'Documentation for Yggy Editor',
		base: mode === 'production' ? '/yggy-editor/docs/' : '/',
    outDir: '../dist/docs',
		themeConfig: {
			// https://vitepress.dev/reference/default-theme-config
			nav: [
				// { text: 'Home', link: '/' },
				// { text: 'Examples', link: '/markdown-examples' }
			],

			sidebar: [
				// {
				//   text: 'Examples',
				//   items: [
				//     { text: 'Markdown Examples', link: '/markdown-examples' },
				//     { text: 'Runtime API Examples', link: '/api-examples' }
				//   ]
				// }
			],

			socialLinks: [
				{ icon: 'github', link: 'https://github.com/parsehex/yggy-editor' },
			],
		},
	};
});
