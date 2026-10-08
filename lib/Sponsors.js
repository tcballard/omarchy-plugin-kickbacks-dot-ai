// Shared pure model: QML imports this file; portable tests evaluate the same code.
function initial() {
    return { consent: false, paused: false, waiting: false, visible: true,
        agent: 'claude', mode: 'demo' };
}
function transition(state, action) {
    var next = Object.assign({}, state);
    switch (action.type) {
    case 'consent': next.consent = action.value === true; break;
    case 'pause': next.paused = action.value === true; break;
    case 'waiting': next.waiting = action.value === true; break;
    case 'visible': next.visible = action.value === true; break;
    case 'agent':
        if (action.value !== 'claude' && action.value !== 'codex') throw new Error('Unsupported agent');
        next.agent = action.value; next.waiting = false; break;
    case 'mode':
        if (action.value !== 'demo' && action.value !== 'live') throw new Error('Unsupported mode');
        next.mode = action.value; next.waiting = false; break;
    default: throw new Error('Unknown action');
    }
    return next;
}
function presentation(state) {
    if (state.mode !== 'demo') return { status: 'unavailable', text: 'Live integration unavailable. Awaiting provider support.' };
    if (!state.consent) return { status: 'disabled', text: 'Enable the local demo to preview a sponsor line.' };
    if (state.paused) return { status: 'paused', text: 'Demo paused.' };
    if (!state.visible) return { status: 'hidden', text: '' };
    if (!state.waiting) return { status: 'idle', text: 'Ready. Simulate an agent wait to preview.' };
    return { status: 'demo', text: '[DEMO · Sponsored] Example Tools — build something useful. No earnings.' };
}
// Explicit provider boundary. No network, accounting or fabricated balances.
function providerCapabilities() {
    return { provider: 'kickbacks', connected: false, earningSupported: false,
        balance: null, reason: 'Publisher integration not available' };
}
function adapter(agent) {
    if (agent !== 'claude' && agent !== 'codex') throw new Error('Unsupported agent');
    return { agent: agent, demoSupported: true, embeddedSupported: agent === 'claude', terminalWrapperAvailable: true,
        liveValidated: false, earningSupported: false,
        reason: agent === 'claude' ? 'Native mod implemented; authenticated spinner smoke pending' : 'tmux wrapper implemented; live terminal smoke pending' };
}
