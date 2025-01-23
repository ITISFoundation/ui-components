import { MenuItemProps, MenuProps } from "@mui/material";
export type ContextMenuItemProps = MenuItemProps & {
    id?: string | number;
    title: string;
    shortcut?: string;
    checked?: boolean;
    icon?: React.ReactNode;
};
export type ContextMenuProps = Omit<MenuProps, 'open'> & {
    open?: boolean;
    submenu?: boolean;
    dense?: boolean;
    anchorRef?: React.MutableRefObject<Element | null>;
    onSelect?: (e: MouseEvent, id?: ContextMenuItemProps['id']) => void;
};
export type ContextMenuContextValue = {
    dense: MenuItemProps['dense'];
    onSelect?: ContextMenuProps['onSelect'];
};
