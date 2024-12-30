import React from "react";
import { ClassicScheme } from "rete-react-plugin";

const Connection = (props: {
  data: ClassicScheme["Connection"] & { isLoop?: boolean }
  styles?: () => any
} & React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <div>hola</div>
  )
}

export default Connection
