import { ClickAwayListener, Menu, MenuProps, styled } from '@mui/material'
import { createContext, useState } from 'react'
import { ContextMenuContextValue } from '../types'

export const ContextMenuContext = createContext<ContextMenuContextValue>({
  dense: false
})

const ANCHOR_ORIGIN_DEFAULT: MenuProps['anchorOrigin'] = {
  vertical: 'top',
  horizontal: 'right'
}

const ContextMenu = (props: MenuProps & {
  submenu?: boolean
  dense?: boolean
}) => {
  const { submenu, dense=false, onClose, anchorOrigin=ANCHOR_ORIGIN_DEFAULT, ...rest } = props
  const [context] = useState({ dense })
  const menu = (
    <Menu
      hideBackdrop
      disableAutoFocusItem
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      {...rest}
    />
  )
  return submenu ? menu : (
    <ContextMenuContext.Provider value={context}>
      <ClickAwayListener onClickAway={e => onClose && onClose(e, 'backdropClick')}>
        {menu}
      </ClickAwayListener>
    </ContextMenuContext.Provider>
  )
}

export default styled(ContextMenu)`
  pointer-events: none;
  & > .MuiPaper-root {
    pointer-events: auto;
  }
`
