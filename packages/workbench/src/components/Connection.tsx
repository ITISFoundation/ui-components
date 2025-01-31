import { styled } from '@mui/material';
import React from 'react';
import { ClassicScheme, Presets } from 'rete-react-plugin';

const { useConnection } = Presets.classic

const Connection = (props: {
  data: ClassicScheme['Connection'] & { isLoop?: boolean }
  styles?: () => any
} & React.ComponentPropsWithoutRef<'svg'>) => {
  const { styles, data, ...rest } = props
  const path = useConnection()
  if (path == null || path.path == null) {
    return null
  }
  return (
    <svg {...rest}>
      <path d={path.path}></path>
    </svg>
  )
}

export default styled(Connection)(({ theme, styles }) => `
  overflow: visible !important;
  position: absolute;
  pointer-events: none;
  & > path {
    fill: none;
    stroke: ${theme.palette.primary.light};
    stroke-width: 2px;
    pointer-events: auto;
    ${styles && styles()}
  }
`)
