"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Socket = (props) => {
    const { data, className } = props, rest = __rest(props, ["data", "className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `wb-inner-socket ${className}` }, rest)));
};
exports.default = (0, material_1.styled)(Socket)(({ theme }) => `
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${theme.palette.primary.light}
`);
//# sourceMappingURL=Socket.js.map