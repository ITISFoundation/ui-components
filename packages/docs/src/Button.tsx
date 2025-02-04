import React from 'react'
import { Button as MUIButton } from '@mui/material';
import { CustomButtonProps } from './types';

type Custom2ButtonProps = CustomButtonProps & {
  /** just to test now works */
  another?: string
}

const Button = (props: Custom2ButtonProps) => {
  const { loic, ...rest } = props
  return (
    <MUIButton {...rest}>{loic}</MUIButton>
  )
}

export default Button
