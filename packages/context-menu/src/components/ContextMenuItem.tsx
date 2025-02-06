import { ArrowRight, Check } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem, styled } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { ContextMenuItemProps } from '../types';
import ContextMenu, { ContextMenuContext } from './ContextMenu';

export const ContextMenuItem = (props: ContextMenuItemProps) => {

  const { itemId, children, checked, icon, title, shortcut, onClick, ...rest } = props

  const { dense, disablePortal, onSelect } = useContext(ContextMenuContext)

  const [anchor, setAnchor] = useState<Element>()

  const ref = useRef(null)
  const enterTimer = useRef<NodeJS.Timeout>(undefined)

  const setOpen = (open: boolean) => {
    if (ref.current && open) {
      setAnchor(ref.current)
    } else {
      setAnchor(undefined)
    }
  }

  const clickHandler = (e: React.MouseEvent) => {
    if (React.Children.count(children) > 0) {
      setOpen(true)
    } else {
      onSelect && onSelect(e.nativeEvent, itemId)
    }
    onClick && onClick(e as React.MouseEvent<HTMLLIElement, MouseEvent>)
  }

  const enterLeaveHandler = (e: React.MouseEvent) => {
    clearTimeout(enterTimer.current)
    enterTimer.current = setTimeout(() => {
      setOpen(e.type === 'mouseenter')
    }, 400)
  }

  return (
    <MenuItem 
      ref={ref}
      dense={dense}
      onClick={clickHandler}
      onMouseEnter={enterLeaveHandler}
      onMouseLeave={enterLeaveHandler}
      {...rest}
    >
      <ListItemIcon>
        { checked ? <Check fontSize='small'/> : icon }
      </ListItemIcon>
      <ListItemText className='context-item-text'>
        <span className='context-item-title'>{title}</span>
        { shortcut && <span className='context-item-shortcut'>{shortcut}</span> }
      </ListItemText>
      { React.Children.count(children) > 0 && (
        <ContextMenu open={Boolean(anchor)} submenu disablePortal={disablePortal} anchorEl={anchor} onClose={() => setOpen(false)}>
          {children}
        </ContextMenu>
      )}
      <ListItemIcon className='context-item-submenu-icon'>
        { React.Children.count(children) > 0 && (
          <ArrowRight/>
        )}
      </ListItemIcon>
    </MenuItem>
  )
}

export default styled(ContextMenuItem)(({ theme }) => `
  & > .context-item-text {
    flex: 1;
    display: flex;
    & > span {
      flex: 1;
      display: flex;
      & > .context-item-title {
        flex: 1;
      }
      & > .context-item-shortcut {
        color: ${theme.palette.text.disabled};
        margin-left: ${theme.spacing(1)}
      }
    }
  }
  & > .context-item-submenu-icon {
    justify-content: right;
  }
`)
