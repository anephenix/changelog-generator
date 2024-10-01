import { execSync } from 'child_process';

// Get commit messages between previous version and current version

function getCommitMessages(previousVersion: string) {
  return execSync(`git log ${previousVersion}..HEAD --pretty=format:"- %s"`)
    .toString()
    .trim();
}

export { getCommitMessages };
