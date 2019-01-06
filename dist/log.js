"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argv = process.execArgv.join();
const debug = argv.includes('inspect') || argv.includes('debug');
exports.warn = (...msg) => debug && console.warn(msg);
exports.log = (...msg) => debug && console.log(msg);
//# sourceMappingURL=log.js.map