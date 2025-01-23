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
    const { open, submenu, dense, onClose, anchorRef, anchorReference = submenu ? 'anchorEl' : 'anchorPosition', anchorOrigin = ANCHOR_ORIGIN_DEFAULT, anchorPosition, onSelect } = props, rest = __rest(props, ["open", "submenu", "dense", "onClose", "anchorRef", "anchorReference", "anchorOrigin", "anchorPosition", "onSelect"]);
    const [context] = (0, react_1.useState)({ dense, onSelect });
    const [selfOpen, setSelfOpen] = (0, react_1.useState)(false);
    const [selfAnchorPosition, setSelfAnchorPosition] = (0, react_1.useState)({ top: 0, left: 0 });
    (0, react_1.useEffect)(() => {
        if (open == null && anchorRef) {
            const el = anchorRef.current;
            if (el) {
                const handler = (e) => {
                    if (e.type === 'contextmenu') {
                        e.preventDefault();
                        const { clientX: left, clientY: top } = e;
                        setSelfAnchorPosition({ top, left });
                        setSelfOpen(true);
                    }
                };
                const eventName = submenu ? 'click' : 'contextmenu';
                el.addEventListener(eventName, handler);
                return () => el.removeEventListener(eventName, handler);
            }
        }
    }, [open, anchorRef]);
    const clickAwayHandler = (e) => {
        setSelfOpen(false);
        onClose && onClose(e, 'backdropClick');
    };
    const menu = ((0, jsx_runtime_1.jsx)(material_1.Menu, Object.assign({ open: open == null ? selfOpen : open, anchorOrigin: anchorOrigin, anchorPosition: anchorPosition == null ? selfAnchorPosition : anchorPosition, anchorReference: anchorReference, hideBackdrop: true, disableAutoFocusItem: true, onClose: onClose }, rest)));
    return submenu ? menu : ((0, jsx_runtime_1.jsx)(exports.ContextMenuContext.Provider, { value: context, children: (0, jsx_runtime_1.jsx)(material_1.ClickAwayListener, { onClickAway: clickAwayHandler, children: menu }) }));
};
exports.default = (0, material_1.styled)(ContextMenu) `
  pointer-events: none;
  & > .MuiPaper-root {
    pointer-events: auto;
  }
`;
//# sourceMappingURL=ContextMenu.js.map