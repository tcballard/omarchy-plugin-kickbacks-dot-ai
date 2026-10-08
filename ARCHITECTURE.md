# Architecture

Panel.qml is a hosted Omarchy panel. lib/Sponsors.js holds the in-memory demo state; closing clears the simulated wait. No provider is connected and balances remain unknown. No panel state is persisted.

The independent Claude mod under adapters/claude-mod registers /sponsors and adds labelled demo text to the Spinner render hook after session consent. It makes no network calls and does not read prompts. The status-line adapter is an alternative session-only configuration.

The Codex launcher owns a private tmux server, footer and temporary directory; the actual CLI runs unchanged in its pane. Cleanup stops only that server. Node 18+ and tmux 3.4+ are launcher dependencies; the native Claude mod needs neither.

See [embedding contracts and evidence](docs/EMBEDDING.md) and [design](docs/DESIGN.md). No VS Code integration, payout service or background daemon is implemented.
