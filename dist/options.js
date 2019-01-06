"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_EXCLUDE = [
    "__tests__",
    "__mocks__",
    "node_modules"
];
exports.inferOptions = (args) => {
    const { targetDirectory = process.cwd(), excludeFolders = DEFAULT_EXCLUDE, tsConfigPath = `${targetDirectory}/tsconfig.json`, interfaceNameFilter = ['*'] } = args;
    return {
        targetDirectory,
        excludeFolders,
        tsConfigPath,
        interfaceNameFilter
    };
};
//# sourceMappingURL=options.js.map