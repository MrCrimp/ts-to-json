"use strict";
exports.__esModule = true;
var DEFAULT_TS_CONFIG = "/tsconfig.json";
var DEFAULT_EXCLUDE = ["__tests__", "__mocks__"];
exports.configure = function (args) {
    var _a = args.targetDirectory, targetDirectory = _a === void 0 ? process.cwd() : _a, _b = args.userExcludeFolders, userExcludeFolders = _b === void 0 ? DEFAULT_EXCLUDE : _b, _c = args.userTsConfigLocation, userTsConfigLocation = _c === void 0 ? DEFAULT_TS_CONFIG : _c;
    return {
        targetDirectory: targetDirectory,
        userExcludeFolders: userExcludeFolders,
        userTsConfigLocation: userTsConfigLocation
    };
};
//# sourceMappingURL=config.js.map