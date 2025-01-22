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
exports.ContextMenuContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("react");
exports.ContextMenuContext = (0, react_1.createContext)({
    dense: false
});
const ANCHOR_ORIGIN_DEFAULT = {
    vertical: 'top',
    horizontal: 'right'
};
const ContextMenu = (props) => {
    const { submenu, dense = false, onClose, anchorOrigin = ANCHOR_ORIGIN_DEFAULT } = props, rest = __rest(props, ["submenu", "dense", "onClose", "anchorOrigin"]);
    const [context] = (0, react_1.useState)({ dense });
    const menu = ((0, jsx_runtime_1.jsx)(material_1.Menu, Object.assign({ hideBackdrop: true, disableAutoFocusItem: true, onClose: onClose, anchorOrigin: anchorOrigin }, rest)));
    return submenu ? menu : ((0, jsx_runtime_1.jsx)(exports.ContextMenuContext.Provider, { value: context, children: (0, jsx_runtime_1.jsx)(material_1.ClickAwayListener, { onClickAway: e => onClose && onClose(e, 'backdropClick'), children: menu }) }));
};
exports.default = (0, material_1.styled)(ContextMenu) `
  pointer-events: none;
  & > .MuiPaper-root {
    pointer-events: auto;
  }
`;
//# sourceMappingURL=ContextMenu.js.map