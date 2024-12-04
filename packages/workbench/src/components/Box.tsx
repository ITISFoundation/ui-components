import React from 'react'

type BoxProps = {
  title: string
}

const Box = ({
  title,
  ...rest
}: React.ComponentPropsWithoutRef<'div'> & BoxProps) => {
  return (
    <div {...rest}>{title}</div>
  )
}

export default Box
