import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
const Test = () => {
    const cyRef = useRef(null);
    const elements = [
        // Box 1
        { data: { id: 'box1', label: 'Box 1' }, position: { x: 150, y: 150 } },
        { data: { id: 'box1-in1', parent: 'box1', portType: 'input' } },
        { data: { id: 'box1-in2', parent: 'box1', portType: 'input' } },
        { data: { id: 'box1-out1', parent: 'box1', portType: 'output' } },
        { data: { id: 'box1-out2', parent: 'box1', portType: 'output' } },
        // Box 2
        { data: { id: 'box2', label: 'Box 2' }, position: { x: 400, y: 150 } },
        { data: { id: 'box2-in1', parent: 'box2', portType: 'input' } },
        { data: { id: 'box2-in2', parent: 'box2', portType: 'input' } },
        { data: { id: 'box2-out1', parent: 'box2', portType: 'output' } },
        { data: { id: 'box2-out2', parent: 'box2', portType: 'output' } },
        // Edges
        { data: { id: 'edge1', source: 'box1-out1', target: 'box2-in1' } },
        { data: { id: 'edge2', source: 'box1-out2', target: 'box2-in2' } },
    ];
    const stylesheet = [
        // Style for boxes
        {
            selector: 'node[id ^= \'box\']',
            style: {
                'background-color': '#6FB1FC',
                label: 'data(label)',
                width: 120,
                height: 80,
                shape: 'roundrectangle',
                'text-halign': 'center',
                'text-valign': 'center',
                'border-width': 2,
                'border-color': '#333',
            },
        },
        // Style for ports
        {
            selector: 'node[portType]',
            style: {
                'background-color': '#FF5733',
                width: 10,
                height: 10,
                shape: 'ellipse',
                label: '',
            },
        },
        // Style for edges
        {
            selector: 'edge',
            style: {
                width: 2,
                'line-color': '#9dbaea',
                'target-arrow-color': '#9dbaea',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
            },
        },
    ];
    const layout = {
        name: 'preset', // Preset layout allows manual positioning
    };
    useEffect(() => {
        const cy = cyRef.current;
        if (cy) {
            const updatePortPositions = () => {
                cy.batch(() => {
                    cy.nodes('[id ^= \'box\']').forEach((box) => {
                        const boxPosition = box.position();
                        const boxWidth = 120; // Box width as defined in the style
                        const boxHeight = 80; // Box height as defined in the style
                        const ports = box.descendants();
                        ports.forEach((port) => {
                            const portId = port.data('id');
                            let offsetX = 0;
                            let offsetY = 0;
                            if (portId.endsWith('in1')) {
                                offsetX = -boxWidth / 2 + 10; // Left side, upper
                                offsetY = -boxHeight / 4;
                            }
                            else if (portId.endsWith('in2')) {
                                offsetX = -boxWidth / 2 + 10; // Left side, lower
                                offsetY = boxHeight / 4;
                            }
                            else if (portId.endsWith('out1')) {
                                offsetX = boxWidth / 2 - 10; // Right side, upper
                                offsetY = -boxHeight / 4;
                            }
                            else if (portId.endsWith('out2')) {
                                offsetX = boxWidth / 2 - 10; // Right side, lower
                                offsetY = boxHeight / 4;
                            }
                            port.position({
                                x: boxPosition.x + offsetX,
                                y: boxPosition.y + offsetY,
                            });
                        });
                    });
                });
            };
            // Position ports initially
            updatePortPositions();
            // Reposition ports when boxes are dragged
            cy.on('dragfree', 'node[id ^= \'box\']', updatePortPositions);
        }
    }, []);
    return (_jsx("div", { style: { width: '100%', height: '100vh' }, children: _jsx(CytoscapeComponent, { elements: elements, style: { width: '100%', height: '100%' }, stylesheet: stylesheet, layout: layout, cy: (cy) => {
                cyRef.current = cy;
                // Enable dragging for boxes only
                cy.nodes('[id ^= \'box\']').grabify();
                cy.nodes('[portType]').ungrabify(); // Prevent port dragging
            } }) }));
};
export default Test;
//# sourceMappingURL=Test.js.map