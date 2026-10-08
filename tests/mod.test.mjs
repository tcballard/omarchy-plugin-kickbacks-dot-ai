import test from 'node:test';
import assert from 'node:assert/strict';
import { register } from '../adapters/claude-mod/hooks/register.js';
function harness(){const hooks={};const commands=[];let redraws=0;
 register((name,filter,handler)=>hooks[name]=handler??filter);
 return {hooks,$:{command:{register:async c=>commands.push(c)},ui:{invalidate:()=>redraws++}},commands,redraws:()=>redraws};}
test('native mod starts disabled, registers toggle and preserves spinner fields',async()=>{
 const h=harness();let forwarded;
 const next=e=>{forwarded=e;return e;};
 await h.hooks['session.start'](h.$,{type:'start'},next);
 assert.equal(h.commands[0].name,'sponsors');
 const e={props:{suffix:' original',verb:'Thinking'},component:'Spinner'};
 await h.hooks['ui.render'](h.$,e,next);assert.equal(forwarded,e);
 await h.hooks['command.run'](h.$);assert.equal(h.redraws(),1);
 await h.hooks['ui.render'](h.$,e,next);assert.match(forwarded.props.suffix,/original.*DEMO.*No earnings/);
 assert.equal(forwarded.props.verb,'Thinking');assert.equal(e.props.suffix,' original');
 await h.hooks['command.run'](h.$);await h.hooks['ui.render'](h.$,e,next);assert.equal(forwarded,e);
});
test('reload clears consent and independent registrations do not share consent',async()=>{
 const a=harness(), b=harness();const next=e=>e;const e={props:{}};
 await a.hooks['command.run'](a.$);
 assert.equal(await b.hooks['ui.render'](b.$,e,next),e);
 await a.hooks['session.start'](a.$,{},next);
 assert.equal(await a.hooks['ui.render'](a.$,e,next),e);
});
