import fs from 'fs';
import path from 'path';

export const readConfig = () => {
  const filePath = path.join(
    process.cwd(),
    'configuration',
    'main.config.json',
  );
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const contents: SiteConfig = JSON.parse(fileContents);

  return contents;
};
