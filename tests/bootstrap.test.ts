import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

test("bootstrap installs defaults without overwriting user files", async () => {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), "aurelian-test-"));
  const testHome = path.join(temporaryRoot, "agent");
  process.env.AURELIAN_HOME = testHome;

  const { initializeAgentHome } = await import("../src/bootstrap.js");
  await initializeAgentHome();

  const systemPath = path.join(testHome, "SYSTEM.md");
  const systemPrompt = await readFile(systemPath, "utf8");
  assert.match(systemPrompt, /Aurelian has no passive execution mode/);

  await writeFile(systemPath, "user customization\n");
  await initializeAgentHome();
  assert.equal(await readFile(systemPath, "utf8"), "user customization\n");

  await rm(temporaryRoot, { recursive: true, force: true });
});
