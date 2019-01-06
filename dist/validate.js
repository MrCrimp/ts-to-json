"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.validateFolder = path => fs.statSync(path).isDirectory();
//# sourceMappingURL=validate.js.map