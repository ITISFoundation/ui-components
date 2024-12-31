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
const rete_react_plugin_1 = require("rete-react-plugin");
const { useConnection } = rete_react_plugin_1.Presets.classic;
const Connection = (props) => {
    const { styles, data } = props, rest = __rest(props, ["styles", "data"]);
    const path = useConnection();
    if (path == null || path.path == null) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("svg", Object.assign({}, rest, { children: (0, jsx_runtime_1.jsx)("path", { d: path.path }) })));
};
exports.default = (0, material_1.styled)(Connection)(({ theme, styles }) => `
  overflow: visible !important;
  position: absolute;
  pointer-events: none;
  & > path {
    fill: none;
    stroke: ${theme.palette.text.primary};
    stroke-width: 2px;
    pointer-events: auto;
    ${styles && styles()}
  }
`);
//# sourceMappingURL=Connection.js.map