"use strict";
exports.__esModule = true;
var parseArguments = require("minimist");
var spinner = require("ora");
var parse_1 = require("./parse");
exports.commandlineArgs = parseArguments(process.argv.slice(2));
exports.showProgress = function () { return spinner('Working...').start(); };
parse_1.parse(exports.commandlineArgs);
//# sourceMappingURL=cli.js.map