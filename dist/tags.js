"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberTags = (m) => {
    const firstDoc = m.getJsDocs() && m.getJsDocs()[0];
    const tags = firstDoc ? firstDoc.getTags() : [];
    //JsDoc tags are not expanded, just text lines, might need work
    return firstDoc ? tags.map((tag) => ({ name: tag.getTagName() })) : [];
};
//# sourceMappingURL=tags.js.map