"use strict";
exports.__esModule = true;
var fs = require("fs");
var utils_1 = require("./utils");
var getDirectories = function (parentDirectory) { return fs.readdirSync(parentDirectory)
    .filter(function (folder) { return fs.statSync(parentDirectory + '/' + folder).isDirectory(); }); };
exports.componentFolders = function (dir, exclude) { return getDirectories(dir).filter(function (c) { return exclude.indexOf(c) === -1; }); };
exports.componentNames = function (dir, exclude) { return [exports.componentFolders(dir, exclude), exports.componentFolders(dir, exclude).map(utils_1.camelCased)]; };
//# sourceMappingURL=component-resolver.js.map