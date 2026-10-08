# Agent Sponsors: scaffold decision record

8 October 2026. Working title, private prototype; no public repository or marketplace submission yet.

## Goal and first slice

Explore opt-in sponsored lines inside Claude Code and Codex terminal UIs,
with Omarchy providing setup and controls. First slice: local panel and terminal
previews exercise the same consent/pause/wait/visibility model. No ads are served,
no impressions submitted, no funds accrued, and no agents are invoked or patched.

ID: io.github.tcballard.agent-sponsors. Kind: panel, entry point Panel.qml.
State belongs to the loaded panel and resets on unloading; nothing sensitive or
persistent is stored. Closing clears the simulated wait. Multiple CLI sessions,
shared process state and persistence are deferred until there is a real backend.
Dependencies: Omarchy hosted Qt Quick/Quickshell at runtime. Node 18+ and Python 3
for development tests; Python is only the toolkit's manifest validator. Future
native helper should use Rust. This scaffold contains no network endpoints,
credentials, external process launch from QML, privileged operations, or custom IPC.
The host calls open(payloadJson)/close(); payload is deliberately ignored.

## Integration boundaries

lib/Sponsors.js exposes adapter(agent) with separate claude/codex capabilities.
Both explicitly report embeddedSupported=false. terminal.mjs is a preview harness,
not a wrapper and not an integration with an installed CLI. Implement neither
screen scraping nor binary patching based on assumptions. Verify current official
CLI hooks/display extension points separately when implementing the real adapters.

providerCapabilities() is deliberately disconnected with a null balance.
Live mode fails closed. No SDK endpoints, OAuth flow, payout rates or telemetry
schema are invented. Provider acceptance criteria must determine billable views;
local visibility state is only a demo input and does not prove human attention.

Needed from Kickbacks: approved publisher API/SDK, standalone Linux eligibility,
authentication, available placements for each CLI, visibility/anti-fraud contract,
account attribution, test environment, payout/country rules and privacy requirements.
Ad text must remain presentation data, never agent input or shell code.

## Prior art and evidence

Bounded search: official Omarchy plugin manual, built-in plugin README and public
GitHub search for Omarchy Kickbacks integrations. No matching integration surfaced;
this is not a claim of uniqueness. Registry inventory was not exhaustively audited.
Kickbacks itself is the closest provider integration; its supported editor client
is the route for existing supported use, while this prototype explores standalone
terminal support. No provider implementation or assets were copied; licensing and
maintenance of its SDK remain to be checked when offered.

- https://kickbacks.ai/faq — VS Code reporter required; Codex CLI unsupported.
- https://kickbacks.ai/api — public advertiser API, not a publisher integration.
- https://omarchy.org/manual/shell-plugins/ — hosted plugin model.
- https://github.com/omacom/omarchy/tree/quattro/shell/plugins — built-ins.

Own MIT implementation using the Omarchy plugin toolkit baseline. No Omakit
Run/Store adoption needed: no helper processes or durable state exist yet.

## Development workflow and acceptance

Keep main stable. Work on feature/scaffold; add future integration work on feature
branches, run CI, then live-test the exact candidate on the XPS before merging or
releasing. Public distribution/branding and marketplace preflight are deferred.

Portable acceptance: consent gates display, pause/hide/completion suppress it,
changing agent resets waiting, live mode stays unavailable, no balance fabricated,
both terminal previews clearly identify themselves as demos.

Live acceptance still required: plugin discovery, open/close, keyboard focus,
theme rendering, control interactions, reload, disable and removal on Omarchy.
No live-shell validation or screenshot evidence has been obtained here.

## 8 October: embedding implementation supersedes initial deferred scope

See EMBEDDING.md. Claude's documented native mods now provide a real Spinner
ui.render integration, and its status-line API provides an alternate route.
Codex has a tmux-based terminal wrapper; native Codex embedding is still deferred.
The backend still has no provider access. A future Rust provider helper remains the
plan; no native process is needed for the Claude mod itself. Terminal launchers use
Node's standard library without third-party runtime dependencies. The Omarchy panel
and terminal-session controls are independent in this preview.

Remote CI, tmux live behavior and authenticated GUI rendering remain unverified.
Feature branch: feature/terminal-embedding; no release or marketplace submission.
