import React, { useCallback, useEffect, useState } from 'react'
import { NodeEditor } from 'rete'
import { ReactPlugin, Presets, useRete } from 'rete-react-plugin'
import { createRoot } from 'react-dom/client'
import { AreaPlugin } from 'rete-area-plugin'
import Node from './Node'
import { Button, styled, Theme, useTheme } from '@mui/material'
import Connection from './Connection'
import Socket from './Socket'
import { AreaExtra, Schemes, Workbench } from '../types'
import { elk, elkLayoutFromWorkbench, generateWorkbench } from '../utils'
import { Transform } from 'rete-area-plugin/_types/area'

const createEditor = async (
  container: HTMLElement,
  theme: Theme,
  socketSelectionState: [string, React.Dispatch<React.SetStateAction<string>>],
  workbenchSetter: React.Dispatch<React.SetStateAction<Workbench>>,
  areaTransformSetter: React.Dispatch<React.SetStateAction<Transform>>
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
  let zoomTimer: NodeJS.Timeout
  let panTimer: NodeJS.Timeout
  area.addPipe(context => {
    // Save workbench when moving nodes and zooming panning the area
    if (context.type === 'nodetranslated') {
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
    if (context.type === 'zoomed') {
      clearTimeout(zoomTimer)
      if (context.data.source === 'dblclick') {
        area.area.zoom(1)
        area.area.translate(0, 0)
        return
      }
      zoomTimer = setTimeout(() => {
        areaTransformSetter(context.data.previous)
      }, 200)
    }
    if (context.type === 'translated') {
      clearTimeout(panTimer)
      panTimer = setTimeout(() => {
        areaTransformSetter(prevTransform => ({
          ...prevTransform,
          ...context.data.position
        }))
      }, 200)
    }
    return context
  })

  return {
    destroy: () => area.destroy(),
    create: (workbench: Workbench, areaTransform: Transform) => generateWorkbench(workbench, areaTransform, area, editor),
    updatePositions: (workbench: Workbench) => workbench.nodes.forEach(node => node.position && area.translate(node.id, node.position))
  }
}

const Workbench = (props: {
  workbench: Workbench
} & React.ComponentPropsWithoutRef<'div'>) => {
  const { workbench: wb, ...rest } = props
  const theme = useTheme()
  const socketSelectionState = useState<string>('')
  const [workbench, setWorkbench] = useState<Workbench>(wb)
  const [areaTransform, setAreaTransform] = useState<Transform>({ x: 0, y: 0, k: 1 })
  const createCb = useCallback((containerEl: HTMLElement) => createEditor(containerEl, theme, socketSelectionState, setWorkbench, setAreaTransform), [theme, socketSelectionState[0]])
  const [ref, editor] = useRete(createCb)
  useEffect(() => {
    if (editor) {
      editor.create(workbench, areaTransform)
      return editor.destroy
    }
  }, [editor])
  const autoArrangeHandler = () => {
    const newWorkbench = {...workbench}
    elk.layout(elkLayoutFromWorkbench(newWorkbench))
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
        editor?.updatePositions(newWorkbench)
        setWorkbench(newWorkbench)
      })
      .catch(console.error)
  }
  return (
    <div {...rest}>
      <div className='wb-inner-container'>
        <div>
          <Button onClick={autoArrangeHandler}>Auto-arrange</Button>
        </div>
        <div ref={ref} className='wb-workbench' style={{ position: 'relative', padding: '18px' }}/>
      </div>
    </div>
  )
}

export default styled(Workbench)`
  & > .wb-inner-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    & > .wb-workbench {
      flex: 1
    }
  }
`
