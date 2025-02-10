"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenu = exports.ContextMenuContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const ContextMenuItem_1 = __importDefault(require("./ContextMenuItem"));
exports.ContextMenuContext = (0, react_1.createContext)({
    dense: false,
});
const ANCHOR_ORIGIN_DEFAULT = {
    vertical: 'top',
    horizontal: 'right'
};
const ExpandItem = (props) => {
    const { submenu } = props, rest = __rest(props, ["submenu"]);
    return ((0, jsx_runtime_1.jsx)(ContextMenuItem_1.default, Object.assign({}, rest, { children: submenu === null || submenu === void 0 ? void 0 : submenu.map(item => ((0, jsx_runtime_1.jsx)(ExpandItem, Object.assign({}, item), item.itemId || item.title))) })));
};
const ContextMenu = (props) => {
    const { open, submenu, dense, disablePortal, onClose, anchorRef, anchorReference = submenu ? 'anchorEl' : 'anchorPosition', anchorOrigin = ANCHOR_ORIGIN_DEFAULT, anchorPosition, onSelect, children, menu } = props, rest = __rest(props, ["open", "submenu", "dense", "disablePortal", "onClose", "anchorRef", "anchorReference", "anchorOrigin", "anchorPosition", "onSelect", "children", "menu"]);
    const [selfOpen, setSelfOpen] = (0, react_1.useState)(false);
    const [context, setContext] = (0, react_1.useState)({
        dense,
        onSelect: (e, id) => {
            onSelect && onSelect(e, id);
            setSelfOpen(false);
        }
    });
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
    (0, react_1.useEffect)(() => {
        setContext(prevContext => (Object.assign(Object.assign({}, prevContext), { dense })));
    }, [dense]);
    const clickAwayHandler = (e) => {
        setSelfOpen(false);
        onClose && onClose(e, 'backdropClick');
    };
    const menuComponent = ((0, jsx_runtime_1.jsxs)(material_1.Menu, Object.assign({ open: open == null ? selfOpen : open, anchorOrigin: anchorOrigin, anchorPosition: anchorPosition == null ? selfAnchorPosition : anchorPosition, anchorReference: anchorReference, hideBackdrop: true, disableAutoFocusItem: true, onClose: onClose, disablePortal: disablePortal }, rest, { children: [menu === null || menu === void 0 ? void 0 : menu.map(menuItem => ((0, jsx_runtime_1.jsx)(ExpandItem, Object.assign({}, menuItem), menuItem.itemId || menuItem.title))), menu && menu.length && react_1.default.Children.count(children) > 0 && (0, jsx_runtime_1.jsx)(material_1.Divider, {}), children] })));
    return submenu ? menuComponent : ((0, jsx_runtime_1.jsx)(exports.ContextMenuContext.Provider, { value: context, children: (0, jsx_runtime_1.jsx)(material_1.ClickAwayListener, { onClickAway: clickAwayHandler, children: menuComponent }) }));
};
exports.ContextMenu = ContextMenu;
exports.default = (0, material_1.styled)(exports.ContextMenu) `
  pointer-events: none;
  & > .MuiPaper-root {
    pointer-events: auto;
  }
`;
//# sourceMappingURL=ContextMenu.js.map