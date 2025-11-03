const fs = require('fs-extra');
const path = require('path');

async function main() {
  const baseDir = path.resolve(__dirname, '../editor/public/game-data/images');
  const outFile = path.join(baseDir, 'list.json');

  try {
    const files = await fs.readdir(baseDir);
    const images = files.filter((f) => !f.startsWith('.') && !fs.statSync(path.join(baseDir, f)).isDirectory());

    await fs.writeJson(outFile, images);
    console.log(`✅ Wrote ${images.length} image entries to ${path.relative(process.cwd(), outFile)}`);
  } catch (err) {
    console.error('❌ Failed to generate image list:', err);
    process.exit(1);
  }
}

main();
