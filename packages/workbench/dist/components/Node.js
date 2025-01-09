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
    const { data: { id, label, inputs, outputs }, emit, styles, onSocketClick = () => { }, selectedSocket } = props, rest = __rest(props, ["data", "emit", "styles", "onSocketClick", "selectedSocket"]);
    const ports = (0, react_1.useMemo)(() => {
        const ins = Object.entries(inputs);
        const outs = Object.entries(outputs);
        const res = [];
        for (let i = 0; i < ins.length || i < outs.length; i++) {
            if (i < ins.length && ins[i][1]) {
                const [key, input] = ins[i];
                res.push((0, jsx_runtime_1.jsxs)("div", { className: 'wb-node-socket wb-socket-input', onClick: e => onSocketClick(e, key), children: [(0, jsx_runtime_1.jsx)(RefSocket, { nodeId: id, name: 'wb-socket input-socket', side: 'input', emit: emit, socketKey: key, 
                            // @ts-ignore
                            payload: input.socket }), (0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: 'caption', className: 'wb-node-port-label', children: [input.label, " ", selectedSocket] })] }, key));
            }
            else {
                res.push((0, jsx_runtime_1.jsx)("div", {}, `wb-note-input-empty-${i}`));
            }
            if (i < outs.length && outs[i][1]) {
                const [key, output] = outs[i];
                res.push((0, jsx_runtime_1.jsxs)("div", { className: 'wb-node-socket wb-socket-output', onClick: e => onSocketClick(e, key), children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: 'caption', className: 'wb-node-port-label', children: [output.label, " ", selectedSocket] }), (0, jsx_runtime_1.jsx)(RefSocket, { nodeId: id, name: 'wb-socket output-socket', side: 'output', emit: emit, socketKey: key, 
                            // @ts-ignore
                            payload: output.socket })] }, key));
            }
            else {
                res.push((0, jsx_runtime_1.jsx)("div", {}, `wb-note-output-empty-${i}`));
            }
        }
        return res;
    }, [inputs, outputs]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({}, rest, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { className: 'wb-node-title', variant: 'body2', children: label }), (0, jsx_runtime_1.jsx)("div", { className: 'wb-node-socket-container', children: ports })] })));
};
exports.default = (0, material_1.styled)(Node)(({ theme }) => `
  border: 1px solid ${theme.palette.divider};
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing(.5)};
  user-select: none;
  & > .wb-node-socket-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    & > .wb-node-socket {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      &.wb-socket-output {
        justify-content: right;
      }
      & > .wb-socket {
        position: absolute;
        &.input-socket {
          right: 100%
        }
        &.output-socket {
          left: 100%
        }
      }
    }
  }
`);
//# sourceMappingURL=Node.js.map