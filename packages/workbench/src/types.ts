import { ClassicPreset, GetSchemes } from 'rete'
import { Transform } from 'rete-area-plugin/_types/area'
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
  /** JSON representation of a workbench to display */
  workbench: Workbench
  areaTransform?: Transform
}

export type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>

export type AreaExtra = ReactArea2D<Schemes>
