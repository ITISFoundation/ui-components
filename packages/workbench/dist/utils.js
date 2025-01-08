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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWorkbench = exports.initialWorkbench = void 0;
const rete_1 = require("rete");
exports.initialWorkbench = {
    nodes: [
        {
            label: 'Node #1',
            inputs: [
                { id: 'x', label: 'In' }
            ],
            outputs: [
                { id: 'a', label: 'E(m,a)' }
            ],
            position: { x: 0, y: 0 }
        },
        {
            label: 'B',
            inputs: [
                { id: 'b', label: 'Field value' },
                { id: 'c', label: 'Power (W)' }
            ],
            outputs: [
                { id: 'd', label: 'Out' }
            ],
            position: { x: 270, y: 0 }
        }
    ],
    connections: [
        { orig: 'a', dest: 'b' },
        { orig: 'a', dest: 'c' }
    ]
};
const generateWorkbench = (workbench, area, editor) => {
    const socket = new rete_1.ClassicPreset.Socket('socket');
    const portIdToNodeMap = {};
    workbench.nodes.forEach((node) => __awaiter(void 0, void 0, void 0, function* () {
        const newNode = new rete_1.ClassicPreset.Node(node.label);
        node.inputs.forEach(input => {
            portIdToNodeMap[input.id] = newNode;
            newNode.addInput(input.id, new rete_1.ClassicPreset.Input(socket, input.label));
        });
        node.outputs.forEach(output => {
            portIdToNodeMap[output.id] = newNode;
            newNode.addOutput(output.id, new rete_1.ClassicPreset.Output(socket, output.label));
        });
        yield editor.addNode(newNode);
        yield area.translate(newNode.id, node.position);
    }));
    workbench.connections.forEach((conn) => __awaiter(void 0, void 0, void 0, function* () {
        yield editor.addConnection(new rete_1.ClassicPreset.Connection(portIdToNodeMap[conn.orig], conn.orig, portIdToNodeMap[conn.dest], conn.dest));
    }));
};
exports.generateWorkbench = generateWorkbench;
//# sourceMappingURL=utils.js.map