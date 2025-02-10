import { MenuItemProps, MenuProps } from "@mui/material"

export type Divider = {
  divider: boolean
}

export type ContextMenuItem = {
  /** ID for the menu item. This is the value given to the `onSelect` when the item is selected. */
  itemId?: string | number
  /** Main text to display */
  title: string
  /** Secondary text to display, next to the title. */
  shortcut?: string
  /** When true, a check icon is shown instead of the provided `icon`. */
  checked?: boolean
  /** Icon to show before the main text. */
  icon?: React.ReactNode
}

export type ContextMenuItemWithSubmenu = ContextMenuItem & {
  submenu?: ContextMenuItemWithSubmenu[]
}

export type ContextMenuItemProps = MenuItemProps & ContextMenuItem

export type ContextMenuProps = Omit<MenuProps, 'open' | 'onSelect'> & {
  /** Displays or hides the menu. */
  open?: boolean
  /** Indicates whether it is the main, parent menu or a submenu. To be used only internally. */
  submenu?: boolean
  /** Toggles between a normal layout or a more compact one. */
  dense?: boolean
  /** Element to which the context menu is attached. Right clicking on this element will open the menu unless `open` property is defined. */
  anchorRef?: React.MutableRefObject<Element | null>,
  /** Called when a menu item gets selected. */
  onSelect?: (e: Event, id: ContextMenuItemProps['itemId']) => void
  /** This property is used to control which menu items to display. */
  menu?: ContextMenuItemWithSubmenu[]
}

export type ContextMenuContextValue = {
  dense: MenuItemProps['dense'],
  onSelect?: ContextMenuProps['onSelect']
}
