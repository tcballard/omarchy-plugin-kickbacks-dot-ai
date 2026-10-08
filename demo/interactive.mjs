import readline from 'node:readline';
console.log(`Agent Sponsors ${process.argv[2]} fixture — NOT the real agent.`);
console.log('Type any text to verify input, /clear to redraw, /quit to exit. No network calls.');
const rl=readline.createInterface({input:process.stdin,output:process.stdout,prompt:'fixture> '});rl.prompt();
rl.on('line',line=>{if(line==='/quit'){rl.close();return;} if(line==='/clear')process.stdout.write('\x1b[2J\x1b[H');else console.log('Input received ('+line.length+' characters).');rl.prompt();});
