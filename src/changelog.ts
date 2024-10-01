// Dependencies
import { readFileSync, writeFileSync } from 'fs';

interface GenerateNewEntryProps {
  nextVersion: string;
  currentDate: string;
  commitMessages: string;
}

class Changelog {
  changelogPath: string;

  constructor(changelogPath: string) {
    this.changelogPath = changelogPath;
  }
  read() {
    const changelogContent = readFileSync(this.changelogPath, 'utf-8');
    return changelogContent;
  }

  write(newChangelogEntry: string) {
    const changelogContent = this.read();
    const changelogLines = changelogContent.split('\n');
    changelogLines.splice(2, 0, newChangelogEntry);
    const updatedChangelogContent = changelogLines.join('\n');

    // Save updated CHANGELOG.md
    writeFileSync(this.changelogPath, updatedChangelogContent, 'utf-8');
  }

  generateNewEntry({
    nextVersion,
    currentDate,
    commitMessages,
  }: GenerateNewEntryProps) {
    return `### ${nextVersion} - ${currentDate}/n/n${commitMessages}`;
  }
}

export { Changelog };
