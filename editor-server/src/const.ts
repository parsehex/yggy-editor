import * as path from 'path';

// server will run @ ROOT/editor-server/main.js
// so __dirname is relative to that

export const assetsBase = path.resolve(__dirname, '../assets');
export const editorBase = path.resolve(__dirname, '../editor');
export const editorAssetsBase = path.resolve(__dirname, '../editor-assets');
