import fs from 'fs';
import https from 'https';

export const saveUrlToFile = (url: string, filePath: string) => {
  https
    .get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        fs.writeFileSync(filePath, data, 'utf-8');
      });
    })
    .on('error', (err) => {
      console.error('Error fetching url:', err);
    });
};
