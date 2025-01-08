import { AreaPlugin } from "rete-area-plugin";
import { AreaExtra, Schemes, Workbench } from "./types";
import { ClassicPreset, NodeEditor } from "rete";

export const initialWorkbench: Workbench = {
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
}

export const generateWorkbench = (
  workbench: Workbench,
  area: AreaPlugin<Schemes, AreaExtra>,
  editor: NodeEditor<Schemes>
) => {
  const socket = new ClassicPreset.Socket('socket')
  const portIdToNodeMap: { [key: string]: ClassicPreset.Node } = {}
  workbench.nodes.forEach(async node => {
    const newNode = new ClassicPreset.Node(node.label)
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
}
