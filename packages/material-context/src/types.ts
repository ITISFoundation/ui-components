import { MenuItemProps, MenuProps } from "@mui/material"

export type ContextMenuItemProps = MenuItemProps & {
  itemId?: string | number
  title: string
  shortcut?: string
  checked?: boolean
  icon?: React.ReactNode
}

export type ContextMenuProps = Omit<MenuProps, 'open' | 'onSelect'> & {
  open?: boolean
  submenu?: boolean
  dense?: boolean
  anchorRef?: React.MutableRefObject<Element | null>,
  onSelect?: (e: Event, id: string | number) => void
}

export type ContextMenuContextValue = {
  dense: MenuItemProps['dense'],
  onSelect?: ContextMenuProps['onSelect']
}
