// Dependencies
import { VersionReader } from '../../src/VersionReader';
import path from 'path';
import fs from 'fs';
import assert from 'assert';

// Seed data for testing
const packageJsonPath = path.join(process.cwd(), 'test/data/package.json');
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
      assert.equal(versionReader.currentVersion, '1.0.0');
    });
  });

  describe('#getNextVersion', () => {
    it('should return the next version', () => {
      assert.equal(versionReader.getNextVersion(), '1.0.1');
    });
  });

  describe('#getPreviousVersion', () => {
    /*
      What I think we should do instead is checkout another git repo with tags and use the library against that
      // in this case, a dummy repo with tags that allow for reading pervious versions
    */
    it('should return the previous version');
  });
});
