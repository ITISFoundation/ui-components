import { useCallback, useEffect } from 'react'
import { NodeEditor, GetSchemes, ClassicPreset, NodeBase } from 'rete'
import { ReactPlugin, Presets, ReactArea2D, useRete, ClassicScheme } from 'rete-react-plugin'
import { createRoot } from 'react-dom/client'
import { AreaPlugin } from 'rete-area-plugin'
import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin'
import Node from './Node'
import { Theme, useTheme } from '@mui/material'
import Connection from './Connection'

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>

type AreaExtra = ReactArea2D<Schemes>

const createEditor = async (container: HTMLElement, theme: Theme) => {
  const socket = new ClassicPreset.Socket('socket')
  const editor = new NodeEditor<Schemes>()
  const area = new AreaPlugin<Schemes, AreaExtra>(container)
  const connection = new ConnectionPlugin<Schemes, AreaExtra>()
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot })

  render.addPreset(Presets.classic.setup({
    customize: {
      node: () => props => <Node {...props} theme={theme}/>,
      connection: () => props => <Connection {...props} theme={theme}/>
    }
  }))
  connection.addPreset(ConnectionPresets.classic.setup())
  editor.use(area)
  area.use(connection)
  area.use(render)

  return {
    destroy: () => area.destroy(),
    create: async () => {
      const nodeA = new ClassicPreset.Node("Node #1")
      nodeA.addOutput("a", new ClassicPreset.Output(socket))
      await editor.addNode(nodeA)

      const nodeB = new ClassicPreset.Node("B")
      nodeB.addInput("b", new ClassicPreset.Input(socket))
      nodeB.addInput("c", new ClassicPreset.Input(socket))
      nodeB.addOutput("d", new ClassicPreset.Output(socket))
      await editor.addNode(nodeB)
      await area.translate(nodeB.id, { x: 270, y: 0 })
    }
  }
}

const TestRete = () => {
  const theme = useTheme()
  const createCb = useCallback((containerEl: HTMLElement) => createEditor(containerEl, theme), [theme])
  const [ref, editor] = useRete(createCb)
  useEffect(() => {
    if (editor) {
      editor.create()
      return editor.destroy
    }
  }, [editor])
  return (
    <div style={{ height: '100vh' }}>
      <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%' }}/>
    </div>
  )
}

export default TestRete
