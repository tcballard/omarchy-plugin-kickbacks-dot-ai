# Development

Run ./tests/run for portable checks, then node tests/tmux-smoke.mjs on Linux with tmux 3.4+. See [EMBEDDING.md](EMBEDDING.md) for CLI commands and [VALIDATION.md](VALIDATION.md) for evidence.

On Omarchy, run omarchy plugin validate . and record omarchy-version. Exercise panel open/close, consent, agent selection, simulated wait, pause, reload, monitor changes and theme changes. Record actual desktop evidence in ACCEPTANCE.json; portable tests do not establish live acceptance.

The README contains install/removal commands. Workbench commands require explicit trust. No persistent account data or helper service is created. Native backend work should use Rust once the provider contract is available.
