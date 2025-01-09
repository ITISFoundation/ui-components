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
  socketSelectionState: [string, React.Dispatch<React.SetStateAction<string>>]
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

  area.addPipe(context => {
    if (context.type === 'nodetranslated') {
      console.log(context)
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
  const createCb = useCallback((containerEl: HTMLElement) => createEditor(containerEl, theme, socketSelectionState), [theme, socketSelectionState[0]])
  const [ref, editor] = useRete(createCb)
  const firstRender = useRef<boolean>(true)
  useEffect(() => {
    if (editor) {
      editor.create(firstRender.current ? initialWorkbench : initialWorkbench)
      firstRender.current = false
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
