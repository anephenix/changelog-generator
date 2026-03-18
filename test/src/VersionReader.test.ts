import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
// Dependencies
import { VersionReader } from "../../src/VersionReader";
import { saveUrlToFile } from "../utils/saveUrlToFile";

const url = "https://registry.npmjs.org/@anephenix/sarus/latest";
const packageJsonPath = path.join(process.cwd(), "test/data/package.json");
saveUrlToFile(url, packageJsonPath);
const content = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const versionReader = new VersionReader(packageJsonPath);

const [major, minor, patch] = content.version.split(".").map(Number);
const nextVersion = `${major}.${minor}.${patch + 1}`;
const previousVersion = `${major}.${minor}.${patch - 1}`;

describe("VersionReader", () => {
	describe("constructor", () => {
		it("should set the packageJsonPath property", () => {
			assert.equal(versionReader.packageJsonPath, packageJsonPath);
		});

		it("should set the packageJson property", () => {
			assert.deepEqual(versionReader.packageJson, content);
		});

		it("should set the currentVersion property", () => {
			assert.equal(versionReader.currentVersion, content.version);
		});
	});

	describe("#getNextVersion", () => {
		it("should return the next version", () => {
			assert.equal(versionReader.getNextVersion(), nextVersion);
		});
	});

	describe("#getPreviousVersion", () => {
		it("should return the previous version", async () => {
			const result = await versionReader.getPreviousVersion();
			assert.equal(result, previousVersion);
		});
	});
});
