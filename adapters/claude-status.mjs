#!/usr/bin/env node
// Claude owns stdout placement. Discard session JSON; never log prompts or paths.
import fs from 'node:fs';
import { DEMO_LINE } from './launch.mjs';
if (process.env.AGENT_SPONSORS_DEMO !== '1') process.exit(0);
// Bound input and execution time. Malformed/oversized session data fails blank.
const timer=setTimeout(()=>process.exit(0),750);
let input='';
for await (const chunk of process.stdin) {
  input+=chunk;
  if (Buffer.byteLength(input)>65536) process.exit(0);
}
clearTimeout(timer);
try { const data=JSON.parse(input); if (!data || typeof data !== 'object' || Array.isArray(data)) process.exit(0); } catch { process.exit(0); }
if (process.env.AGENT_SPONSORS_PAUSE_FILE && fs.existsSync(process.env.AGENT_SPONSORS_PAUSE_FILE)) process.exit(0);
const width=Number(process.env.COLUMNS || 80);
const max=Number.isFinite(width) ? Math.max(0,Math.min(160,Math.floor(width))) : 80;
console.log(DEMO_LINE.slice(0,max));
