import { MenuProps } from '@mui/material';
import React from 'react';
import { ContextMenuContextValue, ContextMenuProps } from '../types';
export declare const ContextMenuContext: React.Context<ContextMenuContextValue>;
/**
 * ### Description
 * Context menus give the user actions related to an item. They usually open when right clicking on something but can also respond to button click or tap.
 * Their options are sometimes nested or grouped, creating new submenus that open when clicking or just hovering on the group.
 * Items can have an main label, an icon, be marked as "checked", and have a shortcut or secondary text.
 * They also accept separators.
 */
export declare const ContextMenu: (props: ContextMenuProps) => import("react/jsx-runtime").JSX.Element;
declare const _default: import("@emotion/styled").StyledComponent<Omit<MenuProps, "onSelect" | "open"> & {
    open?: boolean;
    submenu?: boolean;
    dense?: boolean;
    anchorRef?: React.MutableRefObject<Element | null>;
    onSelect?: (e: Event, id: import("../types").ContextMenuItemProps["itemId"]) => void;
    menu?: import("../types").ContextMenuItemWithSubmenuOrDivider[];
} & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export default _default;
