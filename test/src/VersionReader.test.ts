// Dependencies
import { VersionReader } from '../../src/VersionReader';
import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { saveUrlToFile } from '../utils/saveUrlToFile';

const url = 'https://registry.npmjs.org/@anephenix/sarus/latest';
const packageJsonPath = path.join(process.cwd(), 'test/data/package.json');
saveUrlToFile(url, packageJsonPath);
const content = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const versionReader = new VersionReader(packageJsonPath);

describe('VersionReader', () => {
  describe('constructor', () => {
    it('should set the packageJsonPath property', () => {
      assert.equal(versionReader.packageJsonPath, packageJsonPath);
    });

    it('should set the packageJson property', () => {
      assert.deepEqual(versionReader.packageJson, content);
    });

    it('should set the currentVersion property', () => {
      assert.equal(versionReader.currentVersion, '0.6.5');
    });
  });

  describe('#getNextVersion', () => {
    it('should return the next version', () => {
      assert.equal(versionReader.getNextVersion(), '0.6.6');
    });
  });

  describe('#getPreviousVersion', () => {
    it('should return the previous version', async () => {
      const previousVersion = await versionReader.getPreviousVersion();
      assert.equal(previousVersion, '0.6.4');
    });
  });
});
