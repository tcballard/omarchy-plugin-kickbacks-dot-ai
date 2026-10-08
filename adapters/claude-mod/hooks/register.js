// Native Claude Code mod, v2.1.287+. No network, file, prompt or tool hooks.
export function register(on) {
  let enabled = false;
  on('session.start', async ($, event, next) => {
    enabled = false;
    await $.command.register({name:'sponsors',description:'Toggle local sponsor demo. No earnings.'});
    return next(event);
  });
  on('command.run', {command:'sponsors'}, async ($) => {
    enabled = !enabled;
    $.ui.invalidate('ui.render');
    return {text: enabled ? 'Local sponsor demo enabled. No earnings. Run /sponsors to pause.' : 'Sponsor demo paused.'};
  });
  on('ui.render', {component:'Spinner'}, async ($, event, next) => {
    if (!enabled) return next(event);
    const props = event.props || {};
    return next({...event,props:{...props,suffix:
      String(props.suffix || '') + ' [DEMO / Sponsored: Example Tools | No earnings]'}});
  });
}
