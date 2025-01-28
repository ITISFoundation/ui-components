import { ClassicPreset, GetSchemes } from 'rete'
import { ReactArea2D } from 'rete-react-plugin'

export type Port = {
  id: string
  label: string
}

export type Node = {
  id: string
  label: string
  inputs: Port[]
  outputs: Port[],
  position?: {
    x: number
    y: number
  }
}

export type Connection = {
  orig: Port['id']
  dest: Port['id']
}

export type Workbench = {
  nodes: Node[]
  connections: Connection[]
}

export type WorkbenchProps = React.ComponentPropsWithoutRef<'div'> & {
  workbench: Workbench
}

export type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>

export type AreaExtra = ReactArea2D<Schemes>
