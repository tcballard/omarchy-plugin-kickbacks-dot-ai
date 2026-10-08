import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { claudeArgs, shellQuote, prepareTmux, ROOT, DEMO_LINE } from '../adapters/launch.mjs';
const status=path.join(ROOT,'adapters/claude-status.mjs');
function render(input,env={}) {return spawnSync(process.execPath,[status],{input,encoding:'utf8',env:{...process.env,AGENT_SPONSORS_DEMO:'1',...env}});}
test('Claude status prints sponsor using documented stdin/stdout contract',()=>{
  assert.equal(render(JSON.stringify({session_id:'fictional',cwd:'/private/example'})).stdout.trim(),DEMO_LINE);
});
test('status is blank without opt-in, with malformed input or oversized data',()=>{
  for(const input of ['garbage','null','[]','x'.repeat(65537)])assert.equal(render(input).stdout,'');
  assert.equal(render('{}',{AGENT_SPONSORS_DEMO:'0'}).stdout,'');
});
test('status bounds width and respects pause without logging session data',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'sponsor-test-'));const marker=path.join(dir,'paused');
  try{fs.writeFileSync(marker,'');assert.equal(render('{}',{AGENT_SPONSORS_PAUSE_FILE:marker}).stdout,'');
    fs.unlinkSync(marker);assert.equal(render('{}',{COLUMNS:'20'}).stdout.trimEnd().length,20);
    assert.equal(render('{}',{COLUMNS:'0'}).stdout.trim(),'');
  }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('session-only settings preserve agent argv and reject conflicting overrides',()=>{
  const args=['--resume','quoted name; $(touch unwanted)']; const actual=claudeArgs(args);
  assert.deepEqual(actual.slice(2),args);assert.equal(JSON.parse(actual[1]).statusLine.type,'command');
  assert.throws(()=>claudeArgs(['--settings=x']));
});
test('shell quoting preserves literal arguments without evaluation',()=>{
  const value="quotes' spaces $(printf hacked); `printf bad`\nline";
  const r=spawnSync('/bin/sh',['-c',`printf %s ${shellQuote(value)}`],{encoding:'utf8'});
  assert.equal(r.stdout,value);
});
test('terminal wrapper owns a private socket/config and does not rewrite agent flags',()=>{
 const plan=prepareTmux('codex',['--resume','a b']);
 try{assert.equal(fs.statSync(plan.dir).mode&0o777,0o700);assert.match(plan.command,/'codex' '--resume' 'a b'/);
 assert.match(fs.readFileSync(path.join(plan.dir,'tmux.conf'),'utf8'),/No earnings/);
 }finally{fs.rmSync(plan.dir,{recursive:true,force:true});}
});
