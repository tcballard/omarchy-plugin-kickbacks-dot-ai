# Kickbacks.ai standalone integration

## Accepted goal — 8 October 2026

Tom's requested product is an Omarchy plugin connecting real Kickbacks.ai
sponsorship to Claude Code and Codex terminal CLIs without a running VS Code
or Cursor extension. A local sponsored-text demo does not satisfy this goal.

Omarchy owns setup, connection status and pause controls. A standalone Rust
helper should own provider authentication, delivery and reporting. Claude
should replace the thinking verb while preserving its normal controls.
Codex must display within its terminal UI through a verified extension point
or an explicitly maintained integration; the existing tmux footer is only a
placement experiment, not acceptance of native Codex support.

## Verified provider constraints

Checked 8 October 2026 against:
- https://kickbacks.ai/faq
- https://kickbacks.ai/install
- https://kickbacks.ai/api
- https://github.com/rhnoble/kickbacks.ai/blob/main/LICENSE

The official FAQ supports Claude Code terminal but explicitly says Codex
terminal is unsupported and does not earn. The installation guide says terminal
earning requires the editor extension running. The published API manages
advertiser campaigns; it does not document a standalone publisher/earning client.

The public source mirror's licence grants running official, unmodified builds
for their intended purpose and expressly restricts modification, adaptation and
redistribution without written permission. No Kickbacks implementation has been
copied into this project. Obtain a licence for a literal port, or a supported
independent client integration contract. An advertiser API key is not that contract.

These are current product and documentation findings, not evidence that a
standalone integration is technically impossible. The provider may offer a
private SDK or approve a new surface.

## Maintainer request — prepared, not sent

We want to build an Omarchy integration for Kickbacks.ai that works directly
inside Claude Code and Codex terminal CLIs, with no VS Code/Cursor process
required. Omarchy provides setup and pause controls; a local Rust helper handles
the provider connection.

Can you support an independent Linux publisher client, or license the relevant
client components for a port? Specifically, we need:

1. Your supported publisher SDK/API and versioning policy.
2. Standalone sign-in, token refresh/revocation and account attribution.
3. Ad delivery, expiry, rotation, no-fill and kill-switch contracts.
4. Approved terminal placements, particularly enabling Codex CLI earnings.
5. Visibility/dwell rules, event schema, idempotency, retries and multi-session
   deduplication. A local render or elapsed timer must not be mistaken for a
   provider-qualified billable view.
6. Click/link handling and provider-authoritative balance reporting.
7. A sandbox/test account and reconciliation procedure with no live billing.
8. Branding, distribution and privacy requirements.

The current implementation is an independently written placement prototype:
https://github.com/tcballard/omarchy-plugin-kickbacks-dot-ai/pull/4

## Implementation sequence after the contract is supplied

1. Capture the supported contract and source/licensing provenance. Implement the
   Rust provider adapter and authentication against its sandbox.
2. Add the shared process lifecycle and authenticated local IPC. Keep credentials
   outside QML, agent prompts, CLI arguments and logs; use the OS credential store.
3. Feed validated, length-bounded sponsor presentation into Claude's native
   spinner renderer. Preserve interrupt/status controls and restore defaults on
   pause, expiry, disconnection or failure.
4. Verify Codex's available native UI extension contract before choosing an
   implementation. If it requires a maintained Codex fork, document that
   packaging/update commitment instead of calling a tmux footer native support.
5. Connect Omarchy setup, account state, pause/resume and disconnect to the same
   helper state used by all CLI sessions.
6. Implement reporting only from the provider's approved visibility signals.
   Bound retries, deduplicate events and respect provider kill switches.
7. Verify provider receipts and account attribution using test traffic, then
   live-test the exact branch on the XPS before promotion.

Default to private operation: no source code, prompts or responses sent to the
provider. Any contextual targeting requires a separate explicit opt-in and a
documented supported contract. Do not reuse the editor extension's token store,
client identity or private endpoints to impersonate a supported client.

## Completion evidence

- Standalone sign-in and both terminal placements work with the editor closed.
- Real provider test creatives replace Claude's verb and appear within the
  chosen Codex integration.
- Idle, hidden, paused, expired and disconnected placements stop reporting.
- Multiple sessions do not double-count a view; retries remain idempotent.
- Provider test receipts reconcile with the correct user's account.
- Offline/unauthenticated/no-fill states remain distinct; unknown earnings
  remain unknown.
- Disconnect and removal preserve unrelated Claude/Codex settings and leave no
  orphan helper process.
- Portable CI plus live Omarchy and real CLI acceptance are recorded separately.

## Current status

Blocked on the supported publisher contract and, for a literal code port, written
licensing permission. No live provider connection, login, earnings reporting or
native Codex spinner integration has been implemented. The existing demo remains
available; it is not a completed Kickbacks.ai port.
