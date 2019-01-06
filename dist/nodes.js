"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tags_1 = require("./tags");
exports.getNodeInfo = (m) => ({
    text: m.getJsDocs().map(d => d.compilerNode.comment).join('. '),
    tags: tags_1.getMemberTags(m),
    typeName: m.getType().compilerType.intrinsicName || '',
    typeFlags: {
        isNumeric: m.getType().isNumber(),
        isBoolean: m.getType().isBoolean(),
        isString: m.getType().isString(),
        isEnum: m.getType().isEnum(),
        isArray: m.getType().isArray(),
        isObject: m.getType().isObject(),
        isAnonymous: m.getType().isAnonymous()
    }
});
//# sourceMappingURL=nodes.js.map