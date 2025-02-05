import { MenuItemProps, MenuProps } from "@mui/material";
export type ContextMenuItem = {
    itemId?: string | number;
    title: string;
    shortcut?: string;
    checked?: boolean;
    icon?: React.ReactNode;
};
export type ContextMenuItemWithSubmenu = ContextMenuItem & {
    submenu?: ContextMenuItemWithSubmenu[];
};
export type ContextMenuItemProps = MenuItemProps & ContextMenuItem;
export type ContextMenuProps = Omit<MenuProps, 'open' | 'onSelect'> & {
    open?: boolean;
    submenu?: boolean;
    dense?: boolean;
    anchorRef?: React.MutableRefObject<Element | null>;
    onSelect?: (e: Event, id: ContextMenuItemProps['itemId']) => void;
    menu?: ContextMenuItemWithSubmenu[];
};
export type ContextMenuContextValue = {
    dense: MenuItemProps['dense'];
    onSelect?: ContextMenuProps['onSelect'];
};
