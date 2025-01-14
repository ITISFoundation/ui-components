import { AreaPlugin } from "rete-area-plugin";
import { AreaExtra, Schemes, Workbench } from "./types";
import { ClassicPreset, NodeEditor } from "rete";
import { Transform } from "rete-area-plugin/_types/area";
import ElkConstructor, { ElkNode } from "elkjs/lib/elk.bundled.js";

export const elk = new ElkConstructor()

export const elkLayoutFromWorkbench = (wb: Workbench): ElkNode => {
  const children: ElkNode['children'] = []
  const edges: ElkNode['edges'] = []
  wb.nodes.forEach(({ id }) => children.push({ id, width: 180, height: 120 }))
  wb.connections.forEach(({ orig, dest }) => {
    const origNode = wb.nodes.find(node => node.outputs.some(port => port.id === orig))
    const destNode = wb.nodes.find(node => node.inputs.some(port => port.id === dest))
    edges.push({ id: orig + dest, sources: origNode ? [origNode.id] : [], targets: destNode ? [destNode.id] : [] })
  })
  return {
    id: 'root',
    layoutOptions: { 'elk.algorithm': 'layered' },
    children,
    edges
  }
}

export const generateWorkbench = (
  workbench: Workbench,
  areaTransform: Transform,
  area: AreaPlugin<Schemes, AreaExtra>,
  editor: NodeEditor<Schemes>
) => {
  // console.log(area, editor)
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
    if (node.position) {
      await area.translate(newNode.id, node.position)
    }
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
}
