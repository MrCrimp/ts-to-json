"use strict";
exports.__esModule = true;
var component_resolver_1 = require("./component-resolver");
var ts_simple_ast_1 = require("ts-simple-ast");
var result_1 = require("./result");
exports.getInterfaces = function (_a) {
    var targetDirectory = _a.targetDirectory, userExcludeFolders = _a.userExcludeFolders, userTsConfigLocation = _a.userTsConfigLocation;
    var project = new ts_simple_ast_1.Project({
        tsConfigFilePath: userTsConfigLocation,
        addFilesFromTsConfig: false
    });
    project.addExistingSourceFiles(targetDirectory + "/**/*{.d.ts,.ts,.tsx}");
    var _b = component_resolver_1.componentNames(targetDirectory, userExcludeFolders), folders = _b[0], camelCased = _b[1];
    var builder = new result_1.ResultBuilder();
    folders.forEach(function (folder, i) {
        var sourcefile = project.getSourceFile(folder + ".tsx") ||
            project.getSourceFile(folder + ".ts");
        if (!sourcefile) {
            console.log(folder, "not found");
            return;
        }
        // TODO: micromatch
        var props = sourcefile
            .getInterfaces()
            .filter(function (x) { return x.getName() === camelCased[i] + "Props"; })[0];
        if (!props) {
            return;
        }
        var map = props.getMembers().map(function (m) { return [
            m.getSymbol().getName(),
            m
                .getJsDocs()
                .map(function (doc) { return doc.compilerNode.comment; })
                .join("\n\n") //TODO: do not join
        ]; });
        var module = {
            name: camelCased[i],
            members: []
        };
        console.group(camelCased[i]);
        map.forEach(function (member) {
            var _a;
            var name = member[0], docs = member[1];
            module.members.push((_a = {},
                _a[name] = docs,
                _a.documented = !!docs,
                _a));
            if (!docs) {
                // TODO: check not private, and exported etc
                console.warn("member", name, "needs documentation");
            }
            else {
                console.log(name, ": ", docs);
            }
            console.log("\n\n------------------------------------\n\n");
        });
        console.groupEnd();
        builder.add(module);
    });
    return builder.result;
};
//# sourceMappingURL=ast.js.map