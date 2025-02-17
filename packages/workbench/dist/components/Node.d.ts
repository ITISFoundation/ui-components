import { ClassicScheme, RenderEmit } from 'rete-react-plugin';
type Props<S extends ClassicScheme> = {
    data: S["Node"];
    styles?: () => any;
    emit: RenderEmit<S>;
    onSocketClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, socketKey: string) => void;
    selectedSocket: string;
};
declare const _default: import("@emotion/styled").StyledComponent<Props<ClassicScheme> & Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export default _default;
