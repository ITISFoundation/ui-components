import { styled } from "@mui/material"
import React from "react"

const ContextMenu = (props: React.ComponentPropsWithoutRef<'div'> & {
  submenu?: boolean
}) => {
  const { submenu, ...rest } = props
  return (
    <div {...rest}></div>
  )
}

export default styled(ContextMenu)`
  color: blue;
`
