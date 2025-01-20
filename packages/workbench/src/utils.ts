import { AreaPlugin } from "rete-area-plugin";
import { AreaExtra, Schemes, Workbench } from "./types";
import { ClassicPreset, NodeEditor } from "rete";
import { Transform } from "rete-area-plugin/_types/area";
import ElkConstructor, { ElkNode } from "elkjs/lib/elk.bundled.js";
import { SOCKET_SIZE_PX } from "./components/Socket";

const NODE_WIDTH_DEFAULT = 180
const NODE_HEIGHT_DEFAULT = 120

export const elk = new ElkConstructor()

export const elkLayoutFromWorkbench = (wb: Workbench, area: AreaPlugin<Schemes, AreaExtra>): ElkNode => {
  const children: ElkNode['children'] = []
  const edges: ElkNode['edges'] = []
  wb.nodes.forEach(({ id, outputs, inputs }) => {
    const nodeView = area.nodeViews.get(id)
    let width = NODE_WIDTH_DEFAULT
    let height = NODE_HEIGHT_DEFAULT
    if (nodeView) {
      width = nodeView.element.offsetWidth + SOCKET_SIZE_PX * 2
      height = nodeView.element.offsetHeight
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
    })
  })
  wb.connections.forEach(({ orig, dest }) => {
    edges.push({
      id: `${orig}-${dest}`,
      sources: [orig],
      targets: [dest]
    })
  })
  return {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.layered.spacing.edgeNodeBetweenLayers': '40',
      'elk.layered.nodePlacement.strategy': 'SIMPLE'
    },
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

export const autoArrange = (workbench: Workbench, area: AreaPlugin<Schemes, AreaExtra>) => {
  const elkLayout = elkLayoutFromWorkbench(workbench, area)
  const newWorkbench = { ...workbench }
  return elk.layout(elkLayout)
    .then(({ children }) => {
      children?.forEach(async elkNode => {
        const nodeIndex = newWorkbench.nodes.findIndex(node => node.id === elkNode.id)
        if (nodeIndex > -1 && elkNode.x && elkNode.y) {
          newWorkbench.nodes[nodeIndex].position = {
            x: elkNode.x,
            y: elkNode.y
          }
        }
      })
      return newWorkbench
    })
}
