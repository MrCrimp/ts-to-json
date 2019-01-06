"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};
exports.stringify = data => JSON.stringify(data, getCircularReplacer(), 3);
//# sourceMappingURL=json.js.map