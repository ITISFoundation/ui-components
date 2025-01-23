import { MenuProps } from '@mui/material';
import { ContextMenuContextValue } from '../types';
export declare const ContextMenuContext: import("react").Context<ContextMenuContextValue>;
declare const _default: import("@emotion/styled").StyledComponent<Omit<MenuProps, "open"> & {
    open?: boolean;
    submenu?: boolean;
    dense?: boolean;
    anchorRef?: React.MutableRefObject<Element | null>;
} & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export default _default;
