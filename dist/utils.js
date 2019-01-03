"use strict";
exports.__esModule = true;
exports.camelCased = function (c) { return (c
    ?
        c[0].toUpperCase() +
            c.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }).substr(1)
    :
        ''); };
//# sourceMappingURL=utils.js.map