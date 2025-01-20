import { ButtonProps } from "@mui/material";
import { ClassicPreset } from "rete";
export declare class ButtonControl extends ClassicPreset.Control {
    label: string;
    onClick: () => void;
    constructor(label: string, onClick: () => void);
}
declare const Action: (props: {
    data: ButtonControl;
} & ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default Action;
