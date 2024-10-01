// Dependencies
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

class VersionReader {
  packageJsonPath: string;
  packageJson: any;
  currentVersion: string;

  constructor(packageJsonPath: string) {
    this.packageJsonPath = packageJsonPath;
    this.packageJson = JSON.parse(readFileSync(this.packageJsonPath, 'utf-8'));
    this.currentVersion = this.packageJson.version;
  }

  getNextVersion() {
    // Bump patch version
    const [major, minor, patch] = this.currentVersion.split('.').map(Number);
    const nextVersion = `${major}.${minor}.${patch + 1}`;
    return nextVersion;
  }

  /*
        Does it make sense to derive the previous version from the git tags rather than the package.json file?
    */
  getPreviousVersion() {
    // Get previous version from git tags
    const previousVersion = execSync('git describe --tags --abbrev=0 HEAD^')
      .toString()
      .trim();
    return previousVersion;
  }
}

export { VersionReader };
