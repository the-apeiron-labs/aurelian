import { constants } from "node:fs";
import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { agentHome, bundledAgentDirectory } from "./paths.js";

async function copyMissingFiles(source: string, destination: string): Promise<void> {
  await mkdir(destination, { recursive: true });

  for (const entry of await readdir(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyMissingFiles(sourcePath, destinationPath);
      continue;
    }

    try {
      await copyFile(sourcePath, destinationPath, constants.COPYFILE_EXCL);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
        throw error;
      }
    }
  }
}

export async function initializeAgentHome(): Promise<void> {
  await copyMissingFiles(bundledAgentDirectory, agentHome);
}
