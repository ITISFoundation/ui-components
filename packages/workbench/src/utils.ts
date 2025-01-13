import { AreaPlugin } from "rete-area-plugin";
import { AreaExtra, Schemes, Workbench } from "./types";
import { ClassicPreset, NodeEditor } from "rete";
import { Transform } from "rete-area-plugin/_types/area";

export const initialWorkbench: Workbench = {
  nodes: [
    {
      id: '1',
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
      id: '2',
      label: 'B',
      inputs: [
        { id: 'b', label: 'Field value' },
        { id: 'c', label: 'Power (W)' }
      ],
      outputs: [
        { id: 'd', label: 'Out' }
      ],
      position: { x: 270, y: 0 }
    },
    {
      id: '3',
      label: 'Third node',
      inputs: [
        { id: 'yu', label: 'Ch' }
      ],
      outputs: [],
      position: { x: 500, y: 40 }
    }
  ],
  connections: [
    { orig: 'a', dest: 'b' },
    { orig: 'a', dest: 'c' },
    { orig: 'd', dest: 'yu' }
  ]
}

export const generateWorkbench = (
  workbench: Workbench,
  areaTransform: Transform,
  area: AreaPlugin<Schemes, AreaExtra>,
  editor: NodeEditor<Schemes>
) => {
  const socket = new ClassicPreset.Socket('socket')
  const portIdToNodeMap: { [key: string]: ClassicPreset.Node } = {}
  workbench.nodes.forEach(async node => {
    const newNode = new ClassicPreset.Node(node.label)
    newNode.id = node.id
    node.inputs.forEach(input => {
      portIdToNodeMap[input.id] = newNode
      newNode.addInput(input.id, new ClassicPreset.Input(socket, input.label))
    })
    node.outputs.forEach(output => {
      portIdToNodeMap[output.id] = newNode
      newNode.addOutput(output.id, new ClassicPreset.Output(socket, output.label))
    })
    await editor.addNode(newNode)
    await area.translate(newNode.id, node.position)
  })
  workbench.connections.forEach(async conn => {
    await editor.addConnection(new ClassicPreset.Connection(
      portIdToNodeMap[conn.orig],
      conn.orig,
      portIdToNodeMap[conn.dest],
      conn.dest
    ))
  })
  area.area.zoom(areaTransform.k)
  area.area.translate(areaTransform.x, areaTransform.y)
  console.log('generate', areaTransform)
}
