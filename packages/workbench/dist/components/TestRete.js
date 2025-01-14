"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const rete_1 = require("rete");
const rete_react_plugin_1 = require("rete-react-plugin");
const client_1 = require("react-dom/client");
const rete_area_plugin_1 = require("rete-area-plugin");
const Node_1 = __importDefault(require("./Node"));
const material_1 = require("@mui/material");
const Connection_1 = __importDefault(require("./Connection"));
const Socket_1 = __importDefault(require("./Socket"));
const utils_1 = require("../utils");
const createEditor = (container, theme, socketSelectionState, workbenchSetter, areaTransformSetter) => __awaiter(void 0, void 0, void 0, function* () {
    const editor = new rete_1.NodeEditor();
    const area = new rete_area_plugin_1.AreaPlugin(container);
    const render = new rete_react_plugin_1.ReactPlugin({ createRoot: client_1.createRoot });
    const [selectedSocket, setSelectedSocket] = socketSelectionState;
    render.addPreset(rete_react_plugin_1.Presets.classic.setup({
        customize: {
            node: () => props => (0, jsx_runtime_1.jsx)(Node_1.default, Object.assign({}, props, { theme: theme, onSocketClick: (_, key) => setSelectedSocket(key), selectedSocket: selectedSocket })),
            connection: () => props => (0, jsx_runtime_1.jsx)(Connection_1.default, Object.assign({}, props, { theme: theme })),
            socket: () => props => (0, jsx_runtime_1.jsx)(Socket_1.default, Object.assign({}, props, { theme: theme }))
        }
    }));
    editor.use(area);
    area.use(render);
    let translateTimer;
    let zoomTimer;
    let panTimer;
    area.addPipe(context => {
        // Save workbench when moving nodes and zooming panning the area
        if (context.type === 'nodetranslated') {
            clearTimeout(translateTimer);
            translateTimer = setTimeout(() => {
                const { data: { id, position } } = context;
                workbenchSetter(prevWorkbench => {
                    const nodeIndex = prevWorkbench.nodes.findIndex(node => node.id === id);
                    return Object.assign(Object.assign({}, prevWorkbench), { nodes: [
                            ...prevWorkbench.nodes.slice(0, nodeIndex),
                            Object.assign(Object.assign({}, prevWorkbench.nodes[nodeIndex]), { position }),
                            ...prevWorkbench.nodes.slice(nodeIndex + 1)
                        ] });
                });
            }, 200);
        }
        if (context.type === 'zoomed') {
            clearTimeout(zoomTimer);
            if (context.data.source === 'dblclick') {
                area.area.zoom(1);
                area.area.translate(0, 0);
                return;
            }
            zoomTimer = setTimeout(() => {
                areaTransformSetter(context.data.previous);
            }, 200);
        }
        if (context.type === 'translated') {
            clearTimeout(panTimer);
            panTimer = setTimeout(() => {
                areaTransformSetter(prevTransform => (Object.assign(Object.assign({}, prevTransform), context.data.position)));
            }, 200);
        }
        return context;
    });
    return {
        destroy: () => area.destroy(),
        create: (workbench, areaTransform) => (0, utils_1.generateWorkbench)(workbench, areaTransform, area, editor)
    };
});
const TestRete = () => {
    const theme = (0, material_1.useTheme)();
    const socketSelectionState = (0, react_1.useState)('');
    const [workbench, setWorkbench] = (0, react_1.useState)(utils_1.initialWorkbench);
    const [areaTransform, setAreaTransform] = (0, react_1.useState)({ x: 0, y: 0, k: 1 });
    const createCb = (0, react_1.useCallback)((containerEl) => createEditor(containerEl, theme, socketSelectionState, setWorkbench, setAreaTransform), [theme, socketSelectionState[0]]);
    const [ref, editor] = (0, rete_react_plugin_1.useRete)(createCb);
    (0, react_1.useEffect)(() => {
        if (editor) {
            editor.create(workbench, areaTransform);
            return editor.destroy;
        }
    }, [editor]);
    return ((0, jsx_runtime_1.jsx)("div", { style: { height: '100vh' }, children: (0, jsx_runtime_1.jsx)("div", { ref: ref, style: { position: 'relative', width: '100%', height: '100%', padding: '18px' } }) }));
};
exports.default = TestRete;
//# sourceMappingURL=TestRete.js.map