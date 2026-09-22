# Architecture

Aurelian is a maieutic development agent built on the Pi terminal harness. It keeps Pi's interactive interface, model support, sessions, and tool execution while replacing the agent identity and resources with Aurelian's own configuration.

## Launcher versus SDK

The launcher approach starts the existing Pi CLI with an isolated configuration directory. Pi continues to own the terminal UI, session lifecycle, model selection, and tool loop.

An SDK integration would embed Pi inside Aurelian. Aurelian would then own session construction, event streaming, runtime configuration, and possibly its own interface. That control may be useful later, but it adds responsibilities that the first version does not need.

## Runtime flow

1. The shell resolves the `aurelian` executable declared in `package.json`.
2. `bin/aurelian.js` loads the compiled application entry point.
3. `src/index.ts` asks the bootstrap module to initialize the agent home.
4. `src/bootstrap.ts` copies missing bundled resources from `agent/` into `~/.aurelian/agent/`. Existing user files are never overwritten.
5. `src/index.ts` sets `PI_CODING_AGENT_DIR` to the isolated Aurelian home and starts the local Pi executable.
6. If the local Pi executable is unavailable, the launcher uses `npx` to download and run the configured Pi package.
7. Pi loads `SYSTEM.md`, settings, prompt templates, credentials, and sessions from the Aurelian home.

`AURELIAN_HOME` can override the default home for testing or advanced installations.

## Files

### Project entry points

`package.json` defines metadata, scripts, the Pi dependency, distributable files, and the `aurelian` terminal command.

`bin/aurelian.js` is the small executable shim installed on the user's path. It delegates application behavior to compiled code.

`src/index.ts` coordinates initialization and launches Pi while forwarding command-line arguments and terminal input and output.

`src/bootstrap.ts` installs default agent resources without replacing user customizations.

`src/paths.ts` defines package paths, the isolated agent home, and platform-specific executable names.

### Agent resources

`agent/SYSTEM.md` is the behavioral contract. It defines Aurelian as exclusively maieutic and rejects passive execution as a supported mode.

`agent/settings.json` contains Pi settings owned by the Aurelian distribution.

`agent/prompts/investigate.md` provides the `/investigate` workflow for hypotheses, evidence, and experiments.

`agent/prompts/decide.md` provides the `/decide` workflow for consequential choices and tradeoffs.

`agent/prompts/reflect.md` provides the `/reflect` workflow for consolidating a reusable mental model.

### Extension point

`extensions/aurelian.ts` is reserved for behavior that cannot be expressed reliably through instructions or prompt templates. It may later aggregate commands, events, safeguards, and interface elements. It is intentionally excluded from the first runtime until a concrete need is demonstrated.

### Verification

`tests/bootstrap.test.ts` verifies installation behavior and protects user-owned files from future bootstrap changes.

`tests/behavioral-cases.md` defines conversation scenarios used to review whether Aurelian preserves its maieutic identity.

## Distribution

Installing the npm package registers the `aurelian` command and installs Pi as a dependency. The first run creates the isolated agent home. Application source remains in the package installation, while user configuration, authentication, and sessions remain under `~/.aurelian/agent/`.
