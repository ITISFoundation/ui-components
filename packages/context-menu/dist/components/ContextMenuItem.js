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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenuItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const ContextMenu_1 = __importStar(require("./ContextMenu"));
const ContextMenuItem = (props) => {
    const { itemId, children, checked, icon, title, shortcut, onClick } = props, rest = __rest(props, ["itemId", "children", "checked", "icon", "title", "shortcut", "onClick"]);
    const { dense, onSelect } = (0, react_1.useContext)(ContextMenu_1.ContextMenuContext);
    const [anchor, setAnchor] = (0, react_1.useState)();
    const ref = (0, react_1.useRef)(null);
    const enterTimer = (0, react_1.useRef)(undefined);
    const setOpen = (open) => {
        if (ref.current && open) {
            setAnchor(ref.current);
        }
        else {
            setAnchor(undefined);
        }
    };
    const clickHandler = (e) => {
        if (react_1.default.Children.count(children) > 0) {
            setOpen(true);
        }
        else {
            onSelect && onSelect(e.nativeEvent, itemId);
        }
        onClick && onClick(e);
    };
    const enterLeaveHandler = (e) => {
        clearTimeout(enterTimer.current);
        enterTimer.current = setTimeout(() => {
            setOpen(e.type === 'mouseenter');
        }, 400);
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.MenuItem, Object.assign({ ref: ref, dense: dense, onClick: clickHandler, onMouseEnter: enterLeaveHandler, onMouseLeave: enterLeaveHandler }, rest, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItemIcon, { children: checked ? (0, jsx_runtime_1.jsx)(icons_material_1.Check, { fontSize: 'small' }) : icon }), (0, jsx_runtime_1.jsxs)(material_1.ListItemText, { className: 'context-item-text', children: [(0, jsx_runtime_1.jsx)("span", { className: 'context-item-title', children: title }), shortcut && (0, jsx_runtime_1.jsx)("span", { className: 'context-item-shortcut', children: shortcut })] }), react_1.default.Children.count(children) > 0 && ((0, jsx_runtime_1.jsx)(ContextMenu_1.default, { open: Boolean(anchor), submenu: true, anchorEl: anchor, onClose: () => setOpen(false), children: children })), (0, jsx_runtime_1.jsx)(material_1.ListItemIcon, { className: 'context-item-submenu-icon', children: react_1.default.Children.count(children) > 0 && ((0, jsx_runtime_1.jsx)(icons_material_1.ArrowRight, {})) })] })));
};
exports.ContextMenuItem = ContextMenuItem;
exports.default = (0, material_1.styled)(exports.ContextMenuItem)(({ theme }) => `
  & > .context-item-text {
    flex: 1;
    display: flex;
    & > span {
      flex: 1;
      display: flex;
      & > .context-item-title {
        flex: 1;
      }
      & > .context-item-shortcut {
        color: ${theme.palette.text.disabled};
        margin-left: ${theme.spacing(1)}
      }
    }
  }
  & > .context-item-submenu-icon {
    justify-content: right;
  }
`);
//# sourceMappingURL=ContextMenuItem.js.map