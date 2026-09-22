import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const PI_PACKAGE = "@earendil-works/pi-coding-agent";

export const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

export const bundledAgentDirectory = path.join(packageRoot, "agent");

export const agentHome =
  process.env.AURELIAN_HOME ?? path.join(homedir(), ".aurelian", "agent");

export const localPiExecutable = path.join(
  packageRoot,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "pi.cmd" : "pi",
);

export const npxExecutable = process.platform === "win32" ? "npx.cmd" : "npx";
