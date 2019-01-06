"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_1 = require("./ast");
const project_1 = require("./project");
exports.parseInterfaces = (project, options, componentResolver = project_1.getComponentsByConvention) => {
    const [folders, modules] = componentResolver(project, options);
    const interfaceInfo = ast_1.getInterfaces(project, folders, modules);
    return interfaceInfo;
};
//# sourceMappingURL=interface-parser.js.map