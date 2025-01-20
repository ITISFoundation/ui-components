import { styled } from "@mui/material"
import React from "react"
import { ClassicPreset } from "rete"

export const SOCKET_SIZE_PX = 10

const Socket = <T extends ClassicPreset.Socket>(props: React.ComponentPropsWithoutRef<'div'> & {
  data: T
}) => {
  const { data, className, ...rest } = props
  return (
    <div className={`wb-inner-socket ${className}`} {...rest}/>
  )
}

export default styled(Socket)(({ theme }) => `
  display: inline-block;
  width: ${SOCKET_SIZE_PX}px;
  height: ${SOCKET_SIZE_PX}px;
  border-radius: 50%;
  background-color: ${theme.palette.primary.light}
`)
