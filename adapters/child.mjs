import fs from 'node:fs';
import { spawn } from 'node:child_process';
const [result,command,...args]=process.argv.slice(2);
// Parent and child share the pane's foreground process group. Let the child
// handle terminal SIGINT; do not deliver a duplicate interrupt.
process.on('SIGINT',()=>{});
const child=spawn(command,args,{stdio:'inherit'});
let done=false;
function finish(code) {
  if(done)return; done=true;
  fs.writeFileSync(result,String(code),{mode:0o600}); process.exit(code);
}
child.on('error',e=>{console.error(e.message);finish(127);});
child.on('exit',(code,signal)=>finish(code ?? (signal==='SIGINT'?130:143)));
process.on('SIGTERM',()=>child.kill('SIGTERM'));
