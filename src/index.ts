import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { initializeAgentHome } from "./bootstrap.js";
import {
  PI_PACKAGE,
  agentHome,
  localPiExecutable,
  npxExecutable,
} from "./paths.js";

function run(command: string, args: string[]): Promise<number> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env: {
        ...process.env,
        PI_CODING_AGENT_DIR: agentHome,
      },
      stdio: "inherit",
    });

    child.once("error", reject);
    child.once("close", (code, signal) => {
      resolve(signal ? 1 : (code ?? 1));
    });
  });
}

export async function main(args: string[]): Promise<void> {
  await initializeAgentHome();

  const exitCode = existsSync(localPiExecutable)
    ? await run(localPiExecutable, args)
    : await run(npxExecutable, ["--yes", PI_PACKAGE, ...args]);

  process.exitCode = exitCode;
}
