"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDivider = isDivider;
function isDivider(obj) {
    if (obj.divider == null) {
        return false;
    }
    return Object.keys(obj).length === 1;
}
//# sourceMappingURL=types.js.map