// Linux PTY smoke. Run explicitly where tmux and Unix sockets are supported.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {prepareTmux} from '../adapters/launch.mjs';
const plan=prepareTmux('codex',[],{fixture:true});
function tmux(args){const r=spawnSync('tmux',[...plan.base,...args],{encoding:'utf8'});if(r.status!==0)throw new Error(r.stderr||r.error?.message);return r.stdout;}
async function until(fn){for(let i=0;i<50;i++){if(fn())return;await new Promise(r=>setTimeout(r,100));}throw new Error('Timed out waiting for pane');}
try {
 tmux(['new-session','-d','-s','agent','-x','80','-y','24',plan.command]);
 await until(()=>tmux(['capture-pane','-p','-t','agent']).includes('fixture>'));
 assert.match(tmux(['show-options','-v','status-left']),/DEMO.*No earnings/);
 tmux(['send-keys','-t','agent','hello','Enter']);
 await until(()=>tmux(['capture-pane','-p','-t','agent']).includes('Input received (5 characters)'));
 tmux(['resize-window','-t','agent','-x','100','-y','30']);
 assert.equal(tmux(['display-message','-p','-t','agent','#{pane_width}']).trim(),'100');
 tmux(['set-option','status','off']);assert.equal(tmux(['show-options','-v','status']).trim(),'off');
 tmux(['set-option','status','on']);
 tmux(['send-keys','-t','agent','/clear','Enter']);
 await until(()=>tmux(['capture-pane','-p','-t','agent']).includes('fixture>'));
 tmux(['send-keys','-t','agent','/quit','Enter']);
 await until(()=>fs.existsSync(plan.dir+'/exit'));
 assert.equal(fs.readFileSync(plan.dir+'/exit','utf8'),'0');
 console.log('tmux PTY smoke passed: input, redraw, resize, hide/show and exit.');
} finally {
 spawnSync('tmux',['-S',plan.socket,'kill-server'],{stdio:'ignore'});
 fs.rmSync(plan.dir,{recursive:true,force:true});
}
