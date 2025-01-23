import { ClickAwayListener, Menu, MenuProps, styled } from '@mui/material'
import { createContext, useEffect, useState } from 'react'
import { ContextMenuContextValue, ContextMenuProps } from '../types'

export const ContextMenuContext = createContext<ContextMenuContextValue>({
  dense: false
})

const ANCHOR_ORIGIN_DEFAULT: MenuProps['anchorOrigin'] = {
  vertical: 'top',
  horizontal: 'right'
}

const ContextMenu = (props: ContextMenuProps) => {

  const {
    open,
    submenu,
    dense,
    onClose,
    anchorRef,
    anchorReference = submenu ? 'anchorEl' : 'anchorPosition',
    anchorOrigin=ANCHOR_ORIGIN_DEFAULT,
    anchorPosition,
    onSelect,
    ...rest
  } = props

  const [context] = useState<ContextMenuContextValue>({ dense, onSelect })
  const [selfOpen, setSelfOpen] = useState<MenuProps['open']>(false)
  const [selfAnchorPosition, setSelfAnchorPosition] = useState<MenuProps['anchorPosition']>({ top: 0, left: 0 })

  useEffect(() => {
    if (open == null && anchorRef) {
      const el = anchorRef.current
      if (el) {
        const handler = (e: Event) => {
          if (e.type === 'contextmenu') {
            e.preventDefault()
            const { clientX: left, clientY: top } = e as MouseEvent
            setSelfAnchorPosition({ top, left })
            setSelfOpen(true)
          }
        }
        const eventName = submenu ? 'click' : 'contextmenu'
        el.addEventListener(eventName, handler)
        return () => el.removeEventListener(eventName, handler)
      }
    }
  }, [open, anchorRef])

  const clickAwayHandler = (e: MouseEvent | TouchEvent) => {
    setSelfOpen(false)
    onClose && onClose(e, 'backdropClick')
  }

  const menu = (
    <Menu
      open={open == null ? selfOpen : open}
      anchorOrigin={anchorOrigin}
      anchorPosition={anchorPosition == null ? selfAnchorPosition : anchorPosition}
      anchorReference={anchorReference}
      hideBackdrop
      disableAutoFocusItem
      onClose={onClose}
      {...rest}
    />
  )

  return submenu ? menu : (
    <ContextMenuContext.Provider value={context}>
      <ClickAwayListener onClickAway={clickAwayHandler}>
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
