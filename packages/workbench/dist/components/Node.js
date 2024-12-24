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
const react_1 = require("react");
const rete_react_plugin_1 = require("rete-react-plugin");
const { RefSocket } = rete_react_plugin_1.Presets.classic;
const Node = (props) => {
    const { data: { id, label, inputs, outputs }, emit, styles } = props, rest = __rest(props, ["data", "emit", "styles"]);
    const ports = (0, react_1.useMemo)(() => {
        const ins = Object.entries(inputs);
        const outs = Object.entries(outputs);
        const res = [];
        for (let i = 0; i < ins.length || i < outs.length; i++) {
            if (i < ins.length && ins[i][1]) {
                const [key, input] = ins[i];
                res.push((0, jsx_runtime_1.jsxs)("div", { className: 'wb-node-input', children: [(0, jsx_runtime_1.jsx)("div", { className: 'wb-node-port-label', children: input.label }), (0, jsx_runtime_1.jsx)(RefSocket, { nodeId: id, name: 'input-port', side: 'input', emit: emit, socketKey: key, 
                            // @ts-ignore
                            payload: input.socket })] }, key));
            }
            else {
                res.push((0, jsx_runtime_1.jsx)("div", {}, `wb-note-input-empty-${i}`));
            }
            if (i < outs.length && outs[i][1]) {
                const [key, output] = outs[i];
                res.push((0, jsx_runtime_1.jsxs)("div", { className: 'wb-node-output', children: [(0, jsx_runtime_1.jsx)("div", { className: 'wb-node-port-label', children: output.label }), (0, jsx_runtime_1.jsx)(RefSocket, { nodeId: id, name: 'output-port', side: 'output', emit: emit, socketKey: key, 
                            // @ts-ignore
                            payload: output.socket })] }, key));
            }
            else {
                res.push((0, jsx_runtime_1.jsx)("div", {}, `wb-note-input-empty-${i}`));
            }
        }
        return res;
    }, [inputs, outputs]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({}, rest, { children: [(0, jsx_runtime_1.jsx)("div", { className: 'wb-node-title', children: label }), (0, jsx_runtime_1.jsx)("div", { className: 'wb-node-ports', children: ports })] })));
};
exports.default = (0, material_1.styled)(Node)(({ theme }) => `
  border: 1px solid ${theme.palette.divider};
  & > .wb-node-ports {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`);
//# sourceMappingURL=Node.js.map