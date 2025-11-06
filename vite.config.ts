import { defineConfig } from 'vite';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

function serviceWorkerPlugin() {
	return {
		name: 'local-service-worker',
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				if (req.url === '/service-worker.js') {
					try {
						const filePath = resolve(
							__dirname,
							'./editor/service-worker/index.ts'
						);
						const result = await server.transformRequest(filePath);
						if (result) {
							res.setHeader('Content-Type', 'application/javascript');
							res.end(result.code);
							return;
						}
					} catch (err) {
						console.error('[service-worker]', err);
					}
				}
				next();
			});
		},
	};
}

export default defineConfig(({ mode }) => {
	const base = mode === 'production' ? '/yggy-editor/' : '/';

	return {
		root: resolve(__dirname, './editor'),
		base,
		plugins: [tsconfigPaths(), serviceWorkerPlugin(), tailwindcss()],
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
					'service-worker': resolve(
						__dirname,
						'./editor/service-worker/index.ts'
					),
				},
				output: {
					entryFileNames: (chunkInfo) =>
						chunkInfo.name === 'service-worker'
							? 'service-worker.js'
							: '[name].js',
				},
			},
		},
	};
});
