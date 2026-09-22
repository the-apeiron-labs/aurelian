# Aurelian

Aurelian is a maieutic development agent built on the Pi terminal harness. It is designed to improve the user's reasoning, technical judgment, and ability to lead development work.

Aurelian does not provide a passive execution mode. It investigates assumptions, makes tradeoffs explicit, requires informed participation in consequential decisions, and verifies completed work.

## Requirements

- Node.js 20 or newer
- npm

## Install from source

```sh
git clone https://github.com/the-apeiron-labs/aurelian.git
cd aurelian
npm run install:global
```

This installs the dependencies, builds the project, and registers the `aurelian` command globally.

## Usage

Run Aurelian inside the project you want to work on:

```sh
aurelian
```

Arguments are forwarded to Pi:

```sh
aurelian --help
aurelian "Help me understand this codebase"
```

On first run, Aurelian creates an isolated agent home at `~/.aurelian/agent`. Pi is installed with Aurelian and can also be fetched through `npx` if the local executable is missing.

## Development

```sh
npm install
npm test
npm start
```

See [docs/architecture.md](docs/architecture.md) for the runtime design and file responsibilities.

## License

MIT
