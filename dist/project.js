"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_simple_ast_1 = require("ts-simple-ast");
const resolve_files_1 = require("./resolve-files");
exports.getProject = ({ tsConfigPath, targetDirectory, projectFilesIncludeGlob = '/**/*{.d.ts,.ts,.tsx}' }) => {
    const project = new ts_simple_ast_1.Project({
        tsConfigFilePath: tsConfigPath,
        addFilesFromTsConfig: false
    });
    project.addExistingSourceFiles(`${targetDirectory}${projectFilesIncludeGlob}`);
    return project;
};
exports.getComponentsByConvention = (project, { targetDirectory, excludeFolders, }) => {
    return resolve_files_1.componentNames(targetDirectory, excludeFolders);
};
//# sourceMappingURL=project.js.map