"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCased = (c) => (c
    ?
        c[0].toUpperCase() +
            c.replace(/-([a-z])/g, g => g[1].toUpperCase()).substr(1)
    :
        '');
//# sourceMappingURL=utils.js.map