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
exports.autoArrange = exports.generateWorkbench = exports.elkLayoutFromWorkbench = exports.elk = void 0;
const rete_1 = require("rete");
const elk_bundled_js_1 = __importDefault(require("elkjs/lib/elk.bundled.js"));
const Socket_1 = require("./components/Socket");
const NODE_WIDTH_DEFAULT = 180;
const NODE_HEIGHT_DEFAULT = 120;
exports.elk = new elk_bundled_js_1.default();
const elkLayoutFromWorkbench = (wb, area) => {
    const children = [];
    const edges = [];
    wb.nodes.forEach(({ id, outputs, inputs }) => {
        const nodeView = area.nodeViews.get(id);
        let width = NODE_WIDTH_DEFAULT;
        let height = NODE_HEIGHT_DEFAULT;
        if (nodeView) {
            width = nodeView.element.offsetWidth + Socket_1.SOCKET_SIZE_PX * 2;
            height = nodeView.element.offsetHeight;
        }
        children.push({
            id,
            width,
            height,
            // @ts-ignore
            properties: {
                'org.eclipse.elk.portConstraints': 'FIXED_ORDER'
            },
            ports: [
                ...inputs.map(p => ({ id: p.id, properties: { side: 'WEST' } })),
                ...outputs.map(o => ({ id: o.id, properties: { side: 'EAST' } }))
            ]
        });
    });
    wb.connections.forEach(({ orig, dest }) => {
        edges.push({
            id: `${orig}-${dest}`,
            sources: [orig],
            targets: [dest]
        });
    });
    return {
        id: 'root',
        layoutOptions: {
            'elk.algorithm': 'layered',
            'elk.layered.spacing.edgeNodeBetweenLayers': '40',
            'elk.layered.nodePlacement.strategy': 'SIMPLE'
        },
        children,
        edges
    };
};
exports.elkLayoutFromWorkbench = elkLayoutFromWorkbench;
const generateWorkbench = (workbench, areaTransform, area, editor) => {
    const socket = new rete_1.ClassicPreset.Socket('socket');
    const portIdToNodeMap = {};
    workbench.nodes.forEach((node) => __awaiter(void 0, void 0, void 0, function* () {
        const newNode = new rete_1.ClassicPreset.Node(node.label);
        newNode.id = node.id;
        node.inputs.forEach(input => {
            portIdToNodeMap[input.id] = newNode;
            newNode.addInput(input.id, new rete_1.ClassicPreset.Input(socket, input.label));
        });
        node.outputs.forEach(output => {
            portIdToNodeMap[output.id] = newNode;
            newNode.addOutput(output.id, new rete_1.ClassicPreset.Output(socket, output.label));
        });
        yield editor.addNode(newNode);
        if (node.position) {
            yield area.translate(newNode.id, node.position);
        }
    }));
    workbench.connections.forEach((conn) => __awaiter(void 0, void 0, void 0, function* () {
        yield editor.addConnection(new rete_1.ClassicPreset.Connection(portIdToNodeMap[conn.orig], conn.orig, portIdToNodeMap[conn.dest], conn.dest));
    }));
    area.area.zoom(areaTransform.k);
    area.area.translate(areaTransform.x, areaTransform.y);
};
exports.generateWorkbench = generateWorkbench;
const autoArrange = (workbench, area) => {
    const elkLayout = (0, exports.elkLayoutFromWorkbench)(workbench, area);
    const newWorkbench = Object.assign({}, workbench);
    return exports.elk.layout(elkLayout)
        .then(({ children }) => {
        children === null || children === void 0 ? void 0 : children.forEach((elkNode) => __awaiter(void 0, void 0, void 0, function* () {
            const nodeIndex = newWorkbench.nodes.findIndex(node => node.id === elkNode.id);
            if (nodeIndex > -1 && elkNode.x && elkNode.y) {
                newWorkbench.nodes[nodeIndex].position = {
                    x: elkNode.x,
                    y: elkNode.y
                };
            }
        }));
        return newWorkbench;
    });
};
exports.autoArrange = autoArrange;
//# sourceMappingURL=utils.js.map