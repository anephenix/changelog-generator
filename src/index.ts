// Dependencies
import { join } from 'path';
import { formatDateToString } from './date';
import { VersionReader } from './versionReader';
import { getCommitMessages } from './history';
import { Changelog } from './changelog';

const packageJsonPath = join(__dirname, '../package.json');
const versionReader = new VersionReader(packageJsonPath);
const previousVersion = versionReader.getPreviousVersion();
const nextVersion = versionReader.getNextVersion();

// Paths
const changelogPath = join(__dirname, '../CHANGELOG.md');
const changeLog = new Changelog(changelogPath);

const commitMessages = getCommitMessages(previousVersion);
const currentDate = formatDateToString();

// Create new changelog entry
const newChangelogEntry = changeLog.generateNewEntry({
  nextVersion,
  currentDate,
  commitMessages,
});

changeLog.write(newChangelogEntry);
console.log('CHANGELOG.md updated successfully.');

interface ChangelogUpdaterProps {
  packageJsonPath: string;
  changelogPath: string;
}

class ChangelogUpdater {
  previousVersion: string;
  nextVersion: string;
  changelogPath: string;
  changeLog: Changelog;

  constructor({ packageJsonPath, changelogPath }: ChangelogUpdaterProps) {
    const versionReader = new VersionReader(packageJsonPath);
    this.previousVersion = versionReader.getPreviousVersion();
    this.nextVersion = versionReader.getNextVersion();
    this.changelogPath = changelogPath;
    this.changeLog = new Changelog(this.changelogPath);
  }

  update() {
    const commitMessages = getCommitMessages(this.previousVersion);
    const currentDate = formatDateToString();
    const newChangelogEntry = this.changeLog.generateNewEntry({
      nextVersion: this.nextVersion,
      currentDate,
      commitMessages,
    });
    this.changeLog.write(newChangelogEntry);
  }
}

export { ChangelogUpdater };
