import React from 'react';
import { Theme } from '@mui/material';
import { Workbench } from '../types';
declare const Workbench: (props: {
    workbench: Workbench;
} & React.ComponentPropsWithoutRef<"div">) => import("react/jsx-runtime").JSX.Element;
declare const _default: import("@emotion/styled").StyledComponent<{
    workbench: Workbench;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
export default _default;
