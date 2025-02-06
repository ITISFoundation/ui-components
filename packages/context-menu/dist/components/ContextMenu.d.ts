import { MenuProps } from '@mui/material';
import React from 'react';
import { ContextMenuContextValue, ContextMenuItemWithSubmenu, ContextMenuProps } from '../types';
export declare const ContextMenuContext: React.Context<ContextMenuContextValue>;
export declare const ContextMenu: (props: ContextMenuProps) => import("react/jsx-runtime").JSX.Element;
declare const _default: import("@emotion/styled").StyledComponent<Omit<MenuProps, "onSelect" | "open"> & {
    open?: boolean;
    submenu?: boolean;
    dense?: boolean;
    anchorRef?: React.MutableRefObject<Element | null>;
    onSelect?: (e: Event, id: import("../types").ContextMenuItemProps["itemId"]) => void;
    menu?: ContextMenuItemWithSubmenu[];
} & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export default _default;
