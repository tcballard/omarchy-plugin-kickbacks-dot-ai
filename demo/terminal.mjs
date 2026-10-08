#!/usr/bin/env node
import fs from 'node:fs';
import vm from 'node:vm';
const api = vm.createContext({});
vm.runInContext(fs.readFileSync(new URL('../lib/Sponsors.js', import.meta.url), 'utf8'), api);
const agent = process.argv[2];
if (!['claude', 'codex'].includes(agent) || process.argv.length !== 3) {
    console.error('Usage: node demo/terminal.mjs claude|codex'); process.exit(2);
}
console.log(`${agent}: terminal preview only; does not launch or modify your CLI.`);
let state = api.initial();
for (const action of [{type:'agent',value:agent},{type:'consent',value:true},{type:'waiting',value:true}]) state = api.transition(state, action);
console.log(api.presentation(state).text);
state = api.transition(state, {type:'waiting',value:false});
console.log(api.presentation(state).text);
