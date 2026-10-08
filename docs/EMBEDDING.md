# Terminal embedding preview — 8 October 2026

No VS Code dependency for the integrations below. No real ads, billable impressions
or payouts. Omarchy panel controls still affect only the panel demo, not running
terminal sessions. Terminal controls are described below.

## Claude Code: native spinner mod (preferred)

Requires Claude Code 2.1.287+; tested loader/command using 2.1.293. From the repo:

```bash
claude --plugin-dir "$PWD/adapters/claude-mod"
```

Inside Claude, run `/sponsors`, then use Claude normally. The mod appends a clearly
labelled fictional sponsor to the spinner while Claude renders it. `/sponsors`
again disables it. It starts disabled on every session start/reload. This path
needs neither Node nor tmux: Claude loads the JavaScript module itself.

Or use `./bin/agent-sponsors demo claude` (Node 18+ launcher).
Pass normal agent arguments after `--`, e.g. `demo claude -- --resume`.

The original spinner and suffix are preserved; saved user settings stay unchanged.
No hooks read prompts, intercept tools, issue requests or change permissions.
Loading/unloading uses Claude's own plugin mechanisms and respects managed policy.
Claude may generate ignored type declarations under the mod's .claude-plugin/types.
An authenticated interactive spinner turn remains to be checked on the XPS.

## Claude Code: status-line alternative

```bash
./bin/agent-sponsors demo claude --statusline
```

Uses the documented `--settings` session override, not a saved settings edit.
Temporarily replaces your existing status line; normal launches retain it.
Prints a static labelled demo line even while idle; it is not wait detection.
Session JSON is bounded, parsed and discarded. Nothing is logged or sent anywhere.
The launcher prints a per-session pause-marker command. Removing that marker resumes
on the next status refresh. To restore immediately, exit and launch Claude normally.

## Codex: terminal footer around the unmodified CLI

Requires Node 18+, tmux 3.4+, and Codex in PATH. On Omarchy install missing Node/tmux
through your normal package workflow. Start outside an existing tmux session:

```bash
./bin/agent-sponsors demo codex
```

This creates a private tmux server with its own socket and config and runs Codex
inside its pane. The sponsorship strip belongs to tmux, not Codex's own spinner.
It remains visible while idle, so it must not be treated as paid wait-state inventory.
Normal agent arguments follow `--`. Ctrl-b then p hides/shows the strip.
Exit Codex normally to clean up. Detach binding is disabled in this dedicated session;
closing/killing the wrapper terminates its private server. Avoid long-running work
until live smoke passes. No other tmux server, Codex configuration or binary is edited.

To test without an agent/account:

```bash
./bin/agent-sponsors demo codex --fixture
```

This is explicitly a fake interactive agent. Type text, /clear, /quit; resize the
terminal and use Ctrl-b p. It never makes model requests.

A native Codex spinner integration remains separate work: current official footer
configuration lists built-in fields rather than an external command slot. Options
would be an upstream extension point or maintaining a reviewed Codex fork. This
preview does neither and does not pretend the tmux row is native embedding.

## Evidence

- Claude Code 2.1.293: `claude plugin validate --strict --json adapters/claude-mod`
  passes without warnings; identifies only session.start, command.run and ui.render.
- Actual runtime: `claude -p /sponsors --plugin-dir ... --tools ''` successfully
  loads the module and returns its local enable message, without a model turn.
- 13 portable tests cover consent/pause, malformed input, output bounds, quoting,
  settings arguments, spinner property preservation and isolated mod state.
- tmux 3.4 available for attempted PTY smoke, but this execution environment denies
  its Unix socket connection with Operation not permitted. Live smoke did not pass.
  tests/tmux-smoke.mjs is included in CI for a normal Linux runner; remote CI unrun.
- Claude interactive launcher reaches first-run onboarding; authenticated spinner
  rendering not exercised. Omarchy desktop and actual Codex UI smoke also unrun.

## Provider boundary

Kickbacks install page still states terminal earning requires the editor extension
running. Displaying our own demo is independent of their reporting mechanism. No
private API, cloned reporter, spoofed view count or billing telemetry is implemented.

Sources checked 8 October 2026:
- https://code.claude.com/docs/en/plugins/mods/overview
- https://code.claude.com/docs/en/plugins/mods/create
- https://code.claude.com/docs/en/statusline
- https://code.claude.com/docs/en/cli-reference
- https://learn.chatgpt.com/docs/config-file/config-reference
- https://kickbacks.ai/install
- https://man.openbsd.org/tmux.1
