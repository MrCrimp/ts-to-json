"use strict";
exports.__esModule = true;
var fs = require("fs");
exports.validateFolder = function (path) { return fs.statSync(path).isDirectory(); };
//# sourceMappingURL=validate.js.map