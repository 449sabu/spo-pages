import fs from 'fs';
import path from 'path';

export const reedSiteConfig = () => {
  const filePath = path.join(
    process.cwd(),
    'configuration',
    'main.config.json',
  );
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const contents: SiteConfig = JSON.parse(fileContents);
  if (contents.theme === 'sunset') {
    return 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500';
  } else {
    return 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400';
  }
};

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
