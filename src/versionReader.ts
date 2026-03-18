// Dependencies
import { readFileSync } from "node:fs";
import type { IncomingMessage } from "node:http";
const https = require("node:https");

// Types and interfaces

interface PackageInfo {
	versions: Record<string, unknown>;
}

interface PackageJson {
	name: string;
	version: string;
}

// Helper functions

const getVersionsFromData = (data: string) => {
	const packageInfo: PackageInfo = JSON.parse(data);
	const versions: string[] = Object.keys(packageInfo.versions);
	return versions;
};

class VersionReader {
	packageJsonPath: string;
	packageJson: PackageJson;
	currentVersion: string;

	constructor(packageJsonPath: string) {
		this.packageJsonPath = packageJsonPath;
		this.packageJson = JSON.parse(readFileSync(this.packageJsonPath, "utf-8"));
		this.currentVersion = this.packageJson.version;
	}

	getNextVersion() {
		// Bump patch version
		const [major, minor, patch] = this.currentVersion.split(".").map(Number);
		const nextVersion = `${major}.${minor}.${patch + 1}`;
		return nextVersion;
	}

	getAllVersions() {
		const packageName: string = this.packageJson.name;
		const url = `https://registry.npmjs.org/${packageName}`;
		return new Promise((resolve, reject) => {
			https
				.get(url, (res: IncomingMessage) => {
					let data = "";

					// A chunk of data has been received.
					res.on("data", (chunk: string) => {
						data += chunk;
					});

					// The whole response has been received.
					res.on("end", () => {
						try {
							const versions = getVersionsFromData(data);
							resolve(versions);
						} catch (error) {
							reject("Error parsing JSON");
						}
					});
				})
				.on("error", (err: Error) => {
					reject(`Error fetching package info: ${err}`);
				});
		});
	}

	getPreviousVersion() {
		return this.getAllVersions().then((value) => {
			const versions = value as string[];
			const sortedVersions = versions.sort((a, b) => {
				const [aMajor, aMinor, aPatch] = a.split(".").map(Number);
				const [bMajor, bMinor, bPatch] = b.split(".").map(Number);

				if (aMajor !== bMajor) return aMajor - bMajor;
				if (aMinor !== bMinor) return aMinor - bMinor;
				return aPatch - bPatch;
			});

			const currentVersionIndex = sortedVersions.indexOf(this.currentVersion);
			if (currentVersionIndex > 0) {
				return sortedVersions[currentVersionIndex - 1];
			}
			throw new Error("No previous version found");
		});
	}
}

export { VersionReader };
