import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const api = vm.createContext({});
vm.runInContext(fs.readFileSync(new URL('../lib/Sponsors.js',import.meta.url),'utf8'),api);
const change = (s,type,value) => api.transition(s,{type,value});
const active = () => change(change(api.initial(),'consent',true),'waiting',true);
test('requires explicit consent even during waits', () => {
  assert.equal(api.presentation(change(api.initial(),'waiting',true)).status,'disabled');
  assert.equal(api.presentation(change(active(),'consent',false)).status,'disabled');
});
test('pause, visibility and completion suppress sponsor text', () => {
  for (const [key,value,status] of [['pause',true,'paused'],['visible',false,'hidden'],['waiting',false,'idle']])
    assert.equal(api.presentation(change(active(),key,value)).status,status);
});
test('live mode fails closed and never reports money', () => {
  assert.equal(api.presentation(change(active(),'mode','live')).status,'unavailable');
  assert.equal(api.providerCapabilities().balance,null);
  assert.equal(api.providerCapabilities().earningSupported,false);
});
test('both CLI adapters advertise only implemented capabilities', () => {
  for (const agent of ['claude','codex']) {
    assert.equal(api.adapter(agent).embeddedSupported,agent === 'claude');
    assert.equal(api.adapter(agent).earningSupported,false);
    assert.equal(api.presentation(change(active(),'agent',agent)).status,'idle');
  }
  assert.throws(()=>api.adapter('unknown'));
});
test('transition does not mutate original state; demo is labelled', () => {
  const s=api.initial(); change(s,'consent',true); assert.equal(s.consent,false);
  assert.match(api.presentation(active()).text,/DEMO.*No earnings/);
  assert.throws(()=>change(s,'mode','anything'));
});
