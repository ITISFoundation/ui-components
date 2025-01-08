import { styled } from "@mui/material"
import React from "react"
import { ClassicPreset } from "rete"

const Socket = <T extends ClassicPreset.Socket>(props: React.ComponentPropsWithoutRef<'div'> & {
  data: T
}) => {
  const { data, ...rest } = props
  return (
    <div {...rest}/>
  )
}

export default styled(Socket)(({ theme }) => `
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${theme.palette.primary.light}
`)
