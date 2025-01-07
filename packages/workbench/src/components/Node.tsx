import { styled, Typography } from '@mui/material'
import { useMemo } from 'react'
import { ClassicScheme, Presets, RenderEmit } from 'rete-react-plugin'

type Props<S extends ClassicScheme> = {
  data: S["Node"]
  styles?: () => any
  emit: RenderEmit<S>
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
          <div key={key} className='wb-node-socket wb-socket-input'>
            <RefSocket
              nodeId={id}
              name='wb-socket input-socket'
              side='input'
              emit={emit}
              socketKey={key}
              // @ts-ignore
              payload={input.socket}
            />
            {/* @ts-ignore */}
            <Typography variant='caption' className='wb-node-port-label'>{input.label}</Typography>
          </div>
        )
      } else {
        res.push(<div key={`wb-note-input-empty-${i}`}/>)
      }
      if (i < outs.length && outs[i][1]) {
        const [key, output] = outs[i]
        res.push(
          <div key={key} className='wb-node-socket wb-socket-output'>
            {/* @ts-ignore */}
            <Typography variant='caption' className='wb-node-port-label'>{output.label}</Typography>
            <RefSocket
              nodeId={id}
              name='wb-socket output-socket'
              side='output'
              emit={emit}
              socketKey={key}
              // @ts-ignore
              payload={output.socket}
            />
          </div>
        )
      } else {
        res.push(<div key={`wb-note-output-empty-${i}`}/>)
      }
    }
    return res
  }, [inputs, outputs])
  return (
    <div {...rest}>
      <Typography className='wb-node-title' variant='body2'>{label}</Typography>
      <div className='wb-node-socket-container'>
        {ports}
      </div>
    </div>
  )
}

export default styled(Node)(({ theme }) => `
  border: 1px solid ${theme.palette.divider};
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing(.5)};
  user-select: none;
  & > .wb-node-socket-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    & > .wb-node-socket {
      display: flex;
      flex-direction: row;
      align-items: center;
      &.wb-socket-output {
        justify-content: right;
      }
      & > .wb-socket {
        position: absolute;
        &.input-socket {
          right: 100%
        }
        &.output-socket {
          left: 100%
        }
      }
    }
  }
`)
