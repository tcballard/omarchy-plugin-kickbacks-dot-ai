# Scaffold validation — 8 October 2026

- ./tests/run: passed; five state tests, manifest validation, shell syntax and both CLI previews.
- Toolkit validate_plugin.py --json --security: valid; no findings or warnings.
- Node previews are fictional, non-billable and do not embed in either CLI.
- Qt/Quickshell GUI, Omarchy discovery and lifecycle: unrun (not installed here).
- Omakit/marketplace baseline: unrun. Not a release candidate.
- Generated preview.svg is explicitly a placeholder, not screenshot evidence.

## Embedding preview follow-up

13 portable tests pass. Claude 2.1.293 strict plugin validation passes and actual
local `/sponsors` invocation loads the mod successfully. See EMBEDDING.md for
commands, versions, failed tmux environment prerequisite and outstanding live tests.
The initial scaffold-only statements above describe the previous commit.

Toolkit scan of embedding preview: structurally valid, no findings. Review-required
capabilities are limited to CI's explicit apt/tmux installation on its disposable
runner; no installation or privilege escalation occurs in the plugin runtime.
