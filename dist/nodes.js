"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tags_1 = require("./tags");
const triviaCommentsAsString = (node) => node.getJsDocs().map(d => d.compilerNode.comment).join('. ');
const getHiddenIntrinsicTypeName = $type => $type.getType().compilerType.intrinsicName || '';
exports.getNodeInfo = (node) => {
    const name = node.getName();
    const $type = node.getType();
    return {
        name,
        description: triviaCommentsAsString(node),
        tags: tags_1.getMemberTags(node),
        typeName: getHiddenIntrinsicTypeName(node),
        typeFlags: {
            isNumeric: $type.isNumber(),
            isBoolean: $type.isBoolean(),
            isString: $type.isString(),
            isEnum: $type.isEnum(),
            isArray: $type.isArray(),
            isObject: $type.isObject(),
            isAnonymous: $type.isAnonymous(),
            isInterface: $type.isInterface(),
            isClass: $type.isClass()
        }
    };
};
//# sourceMappingURL=nodes.js.map