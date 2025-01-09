import { useCallback, useEffect, useRef, useState } from 'react'
import { NodeEditor } from 'rete'
import { ReactPlugin, Presets, useRete } from 'rete-react-plugin'
import { createRoot } from 'react-dom/client'
import { AreaPlugin } from 'rete-area-plugin'
import Node from './Node'
import { Theme, useTheme } from '@mui/material'
import Connection from './Connection'
import Socket from './Socket'
import { AreaExtra, Schemes, Workbench } from '../types'
import { generateWorkbench, initialWorkbench } from '../utils'

const createEditor = async (
  container: HTMLElement,
  theme: Theme,
  socketSelectionState: [string, React.Dispatch<React.SetStateAction<string>>],
  workbenchSetter: React.Dispatch<React.SetStateAction<Workbench>>
) => {
  const editor = new NodeEditor<Schemes>()
  const area = new AreaPlugin<Schemes, AreaExtra>(container)
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot })

  const [selectedSocket, setSelectedSocket] = socketSelectionState
  render.addPreset(Presets.classic.setup({
    customize: {
      node: () => props => <Node {...props} theme={theme} onSocketClick={(_, key) => setSelectedSocket(key)} selectedSocket={selectedSocket}/>,
      connection: () => props => <Connection {...props} theme={theme}/>,
      socket: () => props => <Socket {...props} theme={theme}/>
    }
  }))
  editor.use(area)
  area.use(render)

  let translateTimer: NodeJS.Timeout
  area.addPipe(context => {
    if (context.type === 'nodetranslated') {
      // Save positions
      clearTimeout(translateTimer)
      translateTimer = setTimeout(() => {
        const { data: { id, position }} = context
        workbenchSetter(prevWorkbench => {
          const nodeIndex = prevWorkbench.nodes.findIndex(node => node.id === id)
          return {
            ...prevWorkbench,
            nodes: [
              ...prevWorkbench.nodes.slice(0, nodeIndex),
              {
                ...prevWorkbench.nodes[nodeIndex],
                position
              },
              ...prevWorkbench.nodes.slice(nodeIndex + 1)
            ]
          }
        })
      }, 200)
    }
    return context
  })

  return {
    destroy: () => area.destroy(),
    create: (workbench: Workbench) => generateWorkbench(workbench, area, editor)
  }
}

const TestRete = () => {
  const theme = useTheme()
  const socketSelectionState = useState<string>('')
  const [workbench, setWorkbench] = useState<Workbench>(initialWorkbench)
  const createCb = useCallback((containerEl: HTMLElement) => createEditor(containerEl, theme, socketSelectionState, setWorkbench), [theme, socketSelectionState[0]])
  const [ref, editor] = useRete(createCb)
  useEffect(() => {
    if (editor) {
      editor.create(workbench)
      return editor.destroy
    }
  }, [editor])
  return (
    <div style={{ height: '100vh' }}>
      <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%', padding: '18px' }}/>
    </div>
  )
}

export default TestRete
