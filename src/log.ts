
const argv = process.execArgv.join();
const debug = argv.includes('inspect') || argv.includes('debug');
export const warn = (...msg) => debug && console.warn(msg);
export const log = (...msg) => debug && console.log(msg);
