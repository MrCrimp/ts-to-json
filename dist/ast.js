"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("./result");
const log_1 = require("./log");
const log_2 = require("./log");
const nodes_1 = require("./nodes");
exports.getInterfaces = (project, folders, moduleNames) => {
    //TODO: module.{sourcefile, folder, name}
    const builder = new result_1.ResultBuilder();
    //TODO Move file concerns out
    folders.forEach((folder, i) => {
        //const sourcefile = sourceFiles[i];
        const sourcefile = project.getSourceFile(`${folder}.tsx`) ||
            project.getSourceFile(`${folder}.ts`);
        if (!sourcefile) {
            //TODO: add incompatible to result
            log_1.warn(`${folder}.ts* not found`);
            return;
        }
        log_2.log(sourcefile);
        const interfacesInFile = sourcefile.getInterfaces();
        if (!interfacesInFile || !interfacesInFile.length) {
            return;
        }
        interfacesInFile.forEach($interface => {
            const members = $interface.getMembers().map(m => [
                m.getSymbol().getName(),
                nodes_1.getNodeInfo(m)
            ]);
            const module = {
                name: $interface.getName(),
                moduleName: moduleNames[i],
                meta: nodes_1.getNodeInfo($interface),
                members: []
            };
            members
                .forEach(member => {
                const [name, docs] = member;
                module.members.push({
                    name,
                    meta: docs,
                    __documented: !!docs.text,
                    __internal: (Array.isArray(docs) &&
                        docs.length &&
                        docs.some(d => d.tags.some(t => t.name === 'internal') ||
                            d.tags.some(t => t.name === 'private')))
                });
            });
            builder.add(module);
        });
    });
    return builder.result;
};
//# sourceMappingURL=ast.js.map