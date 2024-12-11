import React from 'react';
type BoxProps = {
    title: string;
};
declare const Box: ({ title, ...rest }: React.ComponentPropsWithoutRef<"div"> & BoxProps) => import("react/jsx-runtime").JSX.Element;
export default Box;
