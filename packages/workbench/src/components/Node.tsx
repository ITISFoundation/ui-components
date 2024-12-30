import { styled, Theme } from '@mui/material'
import { useMemo } from 'react'
import { ClassicScheme, Presets, RenderEmit } from 'rete-react-plugin'

type NodeExtraData = {
  actions?: string[]
}

type Props<S extends ClassicScheme> = {
  data: S["Node"] & NodeExtraData;
  styles?: () => any;
  emit: RenderEmit<S>;
}

const { RefSocket } = Presets.classic

const Node = <Scheme extends ClassicScheme>(props: Props<Scheme> & React.ComponentPropsWithoutRef<'div'>) => {
  const { data: { id, label, inputs, outputs }, emit, styles, ...rest } = props
  const ports = useMemo(() => {
    const ins = Object.entries(inputs)
    const outs = Object.entries(outputs)
    const res = []
    for (let i = 0; i < ins.length || i < outs.length; i++) {
      if (i < ins.length && ins[i][1]) {
        const [key, input] = ins[i]
        res.push(
          <div key={key} className='wb-node-input'>
            {/* @ts-ignore */}
            <div className='wb-node-port-label'>{input.label}</div>
            <RefSocket
              nodeId={id}
              name='input-port'
              side='input'
              emit={emit}
              socketKey={key}
              // @ts-ignore
              payload={input.socket}
            />
          </div>
        )
      } else {
        res.push(<div key={`wb-note-input-empty-${i}`}/>)
      }
      if (i < outs.length && outs[i][1]) {
        const [key, output] = outs[i]
        res.push(
          <div key={key} className='wb-node-output'>
            {/* @ts-ignore */}
            <div className='wb-node-port-label'>{output.label}</div>
            <RefSocket
              nodeId={id}
              name='output-port'
              side='output'
              emit={emit}
              socketKey={key}
              // @ts-ignore
              payload={output.socket}
            />
          </div>
        )
      } else {
        res.push(<div key={`wb-note-input-empty-${i}`}/>)
      }
    }
    return res
  }, [inputs, outputs])
  return (
    <div {...rest}>
      <div className='wb-node-title'>{label}</div>
      <div className='wb-node-ports'>
        {ports}
      </div>
    </div>
  )
}

export default styled(Node)(({ theme }) => `
  border: 1px solid ${theme.palette.divider};
  & > .wb-node-ports {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`)
