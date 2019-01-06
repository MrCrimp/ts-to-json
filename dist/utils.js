"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCased = (c) => (c
    ?
        c[0].toUpperCase() +
            c.replace(/-([a-z])/g, g => g[1].toUpperCase()).substr(1)
    :
        '');
exports.getInterfaceName = (text) => text.match(/(?![export|interface]).(\w+).(?=\{+)/ig)[0];
//# sourceMappingURL=utils.js.map