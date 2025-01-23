import { ArrowRight, Check } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem, MenuItemProps, styled } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { ContextMenuItemProps } from '../types';
import ContextMenu, { ContextMenuContext } from './ContextMenu';

const ContextMenuItem = (props: ContextMenuItemProps) => {
  const { children, checked, icon, title, shortcut, ...rest } = props
  const { dense } = useContext(ContextMenuContext)
  const [anchor, setAnchor] = useState<Element>()
  const ref = useRef(null)
  const setOpen = (open: boolean) => {
    if (ref.current && open) {
      setAnchor(ref.current)
    } else {
      setAnchor(undefined)
    }
  }
  return (
    <MenuItem ref={ref} dense={dense} onClick={() => setOpen(true)} {...rest}>
      <ListItemIcon>
        { checked ? <Check fontSize='small'/> : icon }
      </ListItemIcon>
      <ListItemText className='context-item-text'>
        <span className='context-item-title'>{title}</span>
        { shortcut && <span className='context-item-shortcut'>{shortcut}</span> }
      </ListItemText>
      { React.Children.count(children) > 0 && (
        <ContextMenu open={Boolean(anchor)} submenu anchorEl={anchor} onClose={() => setOpen(false)}>
          {children}
        </ContextMenu>
      )}
      <ListItemIcon>
        { React.Children.count(children) > 0 && (
          <ArrowRight/>
        )}
      </ListItemIcon>
    </MenuItem>
  )
}

export default styled(ContextMenuItem)(({ theme }) => `
  & .context-item-text {
    flex: 1;
    display: flex;
    & > span {
      display: flex;
      justify-content: space-between;
      & > .context-item-title {
        flex: 1;
      }
      & > .context-item-shortcut {
        color: ${theme.palette.text.disabled};
      }
    }
  }
`)
