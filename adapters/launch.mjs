import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const DEMO_LINE = '[DEMO / Sponsored] Example Tools | No earnings';
export function shellQuote(s) { return "'" + String(s).replaceAll("'", "'\\''") + "'"; }
export function claudeSettings() {
  return { statusLine: { type: 'command', command: `${shellQuote(process.execPath)} ${shellQuote(path.join(ROOT,'adapters/claude-status.mjs'))}`, padding: 0 } };
}
export function claudeArgs(args) {
  if (args.some(a=>a === '--settings' || a.startsWith('--settings='))) throw new Error('This launch supplies session-only --settings; use other Claude options or the terminal wrapper.');
  return ['--settings',JSON.stringify(claudeSettings()),...args];
}
export function tmuxConfig() {
  return [
    'set -g status on', 'set -g status-position bottom',
    "set -g status-style 'fg=colour231,bg=colour24'",
    'set -g status-left-length 150',
    `set -g status-left '${DEMO_LINE}'`,
    "set -g status-right ' C-b p: hide/show '",
    "set -g window-status-format ''", "set -g window-status-current-format ''",
    'set -g status-interval 1', 'set -g allow-rename off',
    // Dedicated session is intentionally not detachable: exit the agent normally.
    'unbind-key d',
    `bind-key p if-shell -F '#{==:#{status},off}' 'set-option status on' 'set-option status off'`,
    ''
  ].join('\n');
}
export function prepareTmux(agent,args,{fixture=false}={}) {
  if (!['claude','codex'].includes(agent)) throw new Error('Unsupported agent');
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'agent-sponsors-'));
  fs.chmodSync(dir,0o700);
  fs.writeFileSync(path.join(dir,'tmux.conf'),tmuxConfig(),{mode:0o600});
  const command=fixture ? [process.execPath,path.join(ROOT,'demo/interactive.mjs'),agent] : [agent,...args];
  // The agent runs attached to tmux's PTY. No transcript interception or prompt edits.
  const runner=[process.execPath,path.join(ROOT,'adapters/child.mjs'),path.join(dir,'exit'),...command];
  return {dir,socket:path.join(dir,'socket'),command:runner.map(shellQuote).join(' '),
    base:['-S',path.join(dir,'socket'),'-f',path.join(dir,'tmux.conf')]};
}
export function runTmux(agent,args,options={}) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) throw new Error('Run this launcher in an interactive terminal.');
  if (process.env.TMUX) throw new Error('Open a terminal outside tmux for this isolated prototype.');
  const plan=prepareTmux(agent,args,options);
  try {
    const r=spawnSync('tmux',[...plan.base,'new-session','-s','agent',plan.command],{stdio:'inherit'});
    if (r.error) throw r.error;
    let code=1;
    try { code=Number(fs.readFileSync(path.join(plan.dir,'exit'),'utf8')); } catch {}
    return Number.isInteger(code) && code>=0 && code<=255 ? code : 1;
  } finally {
    spawnSync('tmux',['-S',plan.socket,'kill-server'],{stdio:'ignore'});
    fs.rmSync(plan.dir,{recursive:true,force:true});
  }
}
