import { Button, ButtonProps } from "@mui/material"
import { ClassicPreset } from "rete"

export class ButtonControl extends ClassicPreset.Control {
  constructor(public label: string, public onClick: () => void) {
    super()
  }
}

const Action = (props: {
  data: ButtonControl
} & ButtonProps) => {
  const { data, ...rest } = props
  return (
    <Button
      onClick={data.onClick}
      {...rest}
    >
      { data.label }
    </Button>
  )
}

export default Action
