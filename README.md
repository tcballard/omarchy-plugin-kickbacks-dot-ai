<h1 align="center">Agent Sponsors</h1>

[![Built for Omarchy: Plugin](https://raw.githubusercontent.com/tcballard/omarchy-badges/75975e5b5bf75e7ede3764bcd2950046f7abfe2c/badges/v1/omarchy-plugin.svg)](https://github.com/tcballard/omarchy-badges)

An Omarchy integration project targeting real Kickbacks.ai sponsorship inside Claude Code and Codex terminal CLIs, without a running editor.
**Embedding preview: native Claude spinner mod plus a Codex terminal wrapper. No live ads, account connection or earnings.**
**Target provider: [Kickbacks.ai](https://kickbacks.ai).** See [credits](CREDITS.md).
The standalone publisher integration is blocked on a supported provider contract;
Codex CLI earning is currently unsupported by Kickbacks. See the
[integration scope and maintainer request](docs/KICKBACKS-INTEGRATION.md).
Independent project; not affiliated with Kickbacks, Anthropic or OpenAI.

## Try native Claude embedding

Requires Claude Code 2.1.287+. No VS Code or Node dependency for this direct route.

```bash
claude --plugin-dir "$PWD/adapters/claude-mod"
```

Run `/sponsors` inside Claude to enable the demo, and again to pause.
For Codex, run `./bin/agent-sponsors demo codex` (Node 18+ and tmux 3.4+).
This wraps Codex with a terminal footer; it does not modify Codex’s own spinner.
See [embedding instructions and evidence](docs/EMBEDDING.md) before testing.

## What is implemented

- Hosted Omarchy panel with agent selection, demo consent, simulated wait and pause.
- Shared state model with portable tests and terminal previews for both agents.
- Native Claude mod validated and loaded successfully by Claude Code 2.1.293.
- Session-only Claude status-line alternative and isolated tmux launcher for Codex.
- Explicit disconnected provider boundary, unknown balance and unavailable live mode.

## Try the terminal preview

Requires Node 18+. Neither command runs Claude or Codex or changes their settings.

```bash
./demo/run claude
./demo/run codex
```

## Try the Omarchy panel

From this checkout on an Omarchy Quattro machine:

```bash
omarchy plugin validate .
omarchy plugin add "$(pwd)" --enable
omarchy-shell shell summon io.github.tcballard.agent-sponsors '{}'
```

Use Enable local demo, choose an agent, then Simulate wait. Close clears the wait.
The entry point is Panel.qml. No background service is installed.

```bash
omarchy plugin remove io.github.tcballard.agent-sponsors
```

The prototype writes no account data and leaves no helper service to remove.

## Development

```bash
./tests/run
```

Tests require Node 18+ and Python 3 (toolkit manifest validation only). Runtime
plugin code is QML/JavaScript. Terminal launcher code uses Node; the direct Claude
mod needs no separate runtime. No Python runtime dependency. Future native backend
work is planned in Rust, after the provider contract and CLI integration are known.
CI runs on pull requests and main; develop on feature branches and live-test before
promotion. Suggested repository topics: omarchy, omarchy-plugin.

## Compatibility and limits

Targets the Omarchy Quattro hosted panel interface. Live Omarchy/Qt testing has
not been performed; no supported version range is claimed yet. The native Claude mod’s loader and local command were exercised with the real CLI;
authenticated spinner rendering is pending. Codex/tmux live smoke was blocked by
this environment’s Unix socket restriction. Basic Node previews exercise only
the state model. See docs/DESIGN.md
for scope, integration questions and remaining live checks.

MIT © 2026 Tom Ballard.
