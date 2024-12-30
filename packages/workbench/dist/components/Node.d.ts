import { Theme } from '@mui/material';
import { ClassicScheme, RenderEmit } from 'rete-react-plugin';
type NodeExtraData = {
    actions?: string[];
};
type Props<S extends ClassicScheme> = {
    data: S["Node"] & NodeExtraData;
    styles?: () => any;
    emit: RenderEmit<S>;
};
declare const _default: import("@emotion/styled").StyledComponent<Props<ClassicScheme> & Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
export default _default;
