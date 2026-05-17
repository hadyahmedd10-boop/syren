import sharp from 'sharp';
import { readdirSync, statSync, renameSync } from 'fs';
import { join } from 'path';

const heroDir = 'public/images/hero';
const files = readdirSync(heroDir);

for (const file of files) {
  if (file.match(/\.(jpg|jpeg|png)$/i)) {
    const fullPath = join(heroDir, file);
    const stat = statSync(fullPath);
    if (stat.size > 200000) {
      await sharp(fullPath)
        .resize(1920, 1080, { fit: 'cover', withoutEnlargement: true })
        .jpeg({ quality: 75, progressive: true })
        .toFile(fullPath + '.tmp');
      renameSync(fullPath + '.tmp', fullPath);
      const newStat = statSync(fullPath);
      console.log('Compressed:', file, 'from', stat.size, 'to', newStat.size);
    }
  }
}
