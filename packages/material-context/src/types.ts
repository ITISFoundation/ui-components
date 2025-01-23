import { MenuItemProps, MenuProps } from "@mui/material"

export type ContextMenuContextValue = {
  dense: MenuItemProps['dense']
}

export type ContextMenuProps = Omit<MenuProps, 'open'> & {
  open?: boolean
  submenu?: boolean
  dense?: boolean
  anchorRef?: React.MutableRefObject<Element | null>
}

export type ContextMenuItemProps = MenuItemProps & {
  title: string
  shortcut?: string
  checked?: boolean
  icon?: React.ReactNode
}
