import { ClickAwayListener, Divider, Menu, MenuProps, styled } from '@mui/material'
import React, { createContext, useEffect, useState } from 'react'
import { ContextMenuContextValue, ContextMenuItemWithSubmenu, ContextMenuProps, isDivider } from '../types'
import ContextMenuItem from './ContextMenuItem'

export const ContextMenuContext = createContext<ContextMenuContextValue>({
  dense: false,
})

const ANCHOR_ORIGIN_DEFAULT: MenuProps['anchorOrigin'] = {
  vertical: 'top',
  horizontal: 'right'
}

const ExpandItem = (props: ContextMenuItemWithSubmenu) => {
  const { submenu, ...rest } = props
  return (
    <ContextMenuItem {...rest}>
      { submenu?.map(item => {
        if (isDivider(item)) {
          return <Divider/>
        }
        return <ExpandItem key={item.itemId || item.title} {...item}/>
      })}
    </ContextMenuItem>
  )
}

export const ContextMenu = (props: ContextMenuProps) => {

  const {
    open,
    submenu,
    dense,
    disablePortal,
    onClose,
    anchorRef,
    anchorReference = submenu ? 'anchorEl' : 'anchorPosition',
    anchorOrigin=ANCHOR_ORIGIN_DEFAULT,
    anchorPosition,
    onSelect,
    children,
    menu,
    ...rest
  } = props

  const [selfOpen, setSelfOpen] = useState<MenuProps['open']>(false)
  const [context, setContext] = useState<ContextMenuContextValue>({
    dense,
    onSelect: (e, id) => {
      onSelect && onSelect(e, id)
      setSelfOpen(false)
    }
  })
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

  useEffect(() => {
    setContext(prevContext => ({
      ...prevContext,
      dense
    }))
  }, [dense])

  const clickAwayHandler = (e: MouseEvent | TouchEvent) => {
    setSelfOpen(false)
    onClose && onClose(e, 'backdropClick')
  }

  const menuComponent = (
    <Menu
      open={open == null ? selfOpen : open}
      anchorOrigin={anchorOrigin}
      anchorPosition={anchorPosition == null ? selfAnchorPosition : anchorPosition}
      anchorReference={anchorReference}
      hideBackdrop
      disableAutoFocusItem
      onClose={onClose}
      disablePortal={disablePortal}
      {...rest}
    >
      { menu?.map(menuItem => {
        if (isDivider(menuItem)) {
          return <Divider/>
        }
        return <ExpandItem key={menuItem.itemId || menuItem.title} {...menuItem}/>
      })}
      { menu && menu.length && React.Children.count(children) > 0 && <Divider/> }
      {children}
    </Menu>
  )

  return submenu ? menuComponent : (
    <ContextMenuContext.Provider value={context}>
      <ClickAwayListener onClickAway={clickAwayHandler}>
        {menuComponent}
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
