import assert from "node:assert";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
// Dependencies
import { Changelog } from "../../src/changelog";

describe("Changelog", () => {
	const originalChangelogPath = path.join(
		process.cwd(),
		"test/data/ORIGINAL_COPY_OF_CHANGELOG.md",
	);
	const updatedChangelogPath = path.join(
		process.cwd(),
		"test/data/UPDATED_CHANGELOG.md",
	);
	const changelogPath = path.join(process.cwd(), "test/data/CHANGELOG.md");
	const changelog = new Changelog(changelogPath);

	describe("constructor", () => {
		it("should set the changelogPath property", () => {
			assert.equal(changelog.changelogPath, changelogPath);
		});
	});

	describe("#read", () => {
		it("should return the content of the CHANGELOG.md file", () => {
			const expected = readFileSync(changelogPath, "utf-8");
			assert.equal(expected, changelog.read());
		});
	});

	describe("#write", () => {
		it("should update the CHANGELOG.md file with the new entry", () => {
			const nextVersion = "0.0.1";
			const currentDate = "Wednesday 1st January, 2025";
			const commitMessages = "- Initial commit\n";
			const newEntry = changelog.generateNewEntry({
				nextVersion,
				currentDate,
				commitMessages,
			});
			changelog.write(newEntry);
			const expected = readFileSync(updatedChangelogPath, "utf-8");
			assert.equal(expected, changelog.read());
		});

		afterAll(() => {
			const originalContent = readFileSync(originalChangelogPath, "utf-8");
			writeFileSync(changelogPath, originalContent, "utf-8");
		});
	});

	describe("#generateNewEntry", () => {
		it("should return a string with the new entry", () => {
			const nextVersion = "0.0.1";
			const currentDate = "Wednesday 1st January, 2025";
			const commitMessages = "- Initial commit\n";
			const expected = `### ${nextVersion} - ${currentDate}\n\n${commitMessages}`;
			assert.equal(
				expected,
				changelog.generateNewEntry({
					nextVersion,
					currentDate,
					commitMessages,
				}),
			);
		});
	});
});
