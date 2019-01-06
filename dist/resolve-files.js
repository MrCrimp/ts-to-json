"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const utils_1 = require("./utils");
const getDirectories = parentDirectory => fs.readdirSync(parentDirectory)
    .filter(folder => fs.statSync(parentDirectory + '/' + folder).isDirectory());
exports.componentFolders = (dir, exclude) => getDirectories(dir).filter(c => exclude.indexOf(c) === -1);
exports.componentNames = (dir, exclude) => [exports.componentFolders(dir, exclude), exports.componentFolders(dir, exclude).map(utils_1.camelCased)];
//# sourceMappingURL=resolve-files.js.map