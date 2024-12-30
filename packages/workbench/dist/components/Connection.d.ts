import React from "react";
import { ClassicScheme } from "rete-react-plugin";
declare const Connection: (props: {
    data: ClassicScheme["Connection"] & {
        isLoop?: boolean;
    };
    styles?: () => any;
} & React.ComponentPropsWithoutRef<"svg">) => import("react/jsx-runtime").JSX.Element;
export default Connection;
