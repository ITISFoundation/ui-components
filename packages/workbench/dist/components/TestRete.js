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
const rete_connection_plugin_1 = require("rete-connection-plugin");
const Node_1 = __importDefault(require("./Node"));
const material_1 = require("@mui/material");
const Connection_1 = __importDefault(require("./Connection"));
const createEditor = (container, theme) => __awaiter(void 0, void 0, void 0, function* () {
    const socket = new rete_1.ClassicPreset.Socket('socket');
    const editor = new rete_1.NodeEditor();
    const area = new rete_area_plugin_1.AreaPlugin(container);
    const connection = new rete_connection_plugin_1.ConnectionPlugin();
    const render = new rete_react_plugin_1.ReactPlugin({ createRoot: client_1.createRoot });
    render.addPreset(rete_react_plugin_1.Presets.classic.setup({
        customize: {
            node: () => props => (0, jsx_runtime_1.jsx)(Node_1.default, Object.assign({}, props, { theme: theme })),
            connection: () => props => (0, jsx_runtime_1.jsx)(Connection_1.default, Object.assign({}, props, { theme: theme }))
        }
    }));
    connection.addPreset(rete_connection_plugin_1.Presets.classic.setup());
    editor.use(area);
    area.use(connection);
    area.use(render);
    return {
        destroy: () => area.destroy(),
        create: () => __awaiter(void 0, void 0, void 0, function* () {
            const nodeA = new rete_1.ClassicPreset.Node("Node #1");
            nodeA.addOutput("a", new rete_1.ClassicPreset.Output(socket));
            yield editor.addNode(nodeA);
            const nodeB = new rete_1.ClassicPreset.Node("B");
            nodeB.addInput("b", new rete_1.ClassicPreset.Input(socket));
            nodeB.addInput("c", new rete_1.ClassicPreset.Input(socket));
            nodeB.addOutput("d", new rete_1.ClassicPreset.Output(socket));
            yield editor.addNode(nodeB);
            yield area.translate(nodeB.id, { x: 270, y: 0 });
        })
    };
});
const TestRete = () => {
    const theme = (0, material_1.useTheme)();
    const createCb = (0, react_1.useCallback)((containerEl) => createEditor(containerEl, theme), [theme]);
    const [ref, editor] = (0, rete_react_plugin_1.useRete)(createCb);
    (0, react_1.useEffect)(() => {
        if (editor) {
            editor.create();
            return editor.destroy;
        }
    }, [editor]);
    return ((0, jsx_runtime_1.jsx)("div", { style: { height: '100vh' }, children: (0, jsx_runtime_1.jsx)("div", { ref: ref, style: { position: 'relative', width: '100%', height: '100%' } }) }));
};
exports.default = TestRete;
//# sourceMappingURL=TestRete.js.map