import { defineConfig } from 'vite';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
	const base = mode === 'production' ? '/yggy-editor/' : '/';
	return {
		root: resolve(__dirname, './editor'),
		base,
		plugins: [tsconfigPaths()],
		define: {
			__BASE__: JSON.stringify(base),
		},
		resolve: {
			preserveSymlinks: true,
		},
		build: {
			outDir: resolve(__dirname, './dist'),
			emptyOutDir: true,
			rollupOptions: {
				input: {
					game: resolve(__dirname, './editor/game/index.html'),
					editor: resolve(__dirname, './editor/index.html'),
				},
			},
		},
	};
});
