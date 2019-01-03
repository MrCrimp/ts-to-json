"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var ast_1 = require("./ast");
exports.parse = function (args) {
    var interfaces = ast_1.getInterfaces(config_1.configure(args));
    return toJSON(interfaces);
};
function toJSON(obj) {
    return JSON.stringify(obj);
}
//# sourceMappingURL=parse.js.map