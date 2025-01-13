import { AreaPlugin } from "rete-area-plugin";
import { AreaExtra, Schemes, Workbench } from "./types";
import { NodeEditor } from "rete";
import { Transform } from "rete-area-plugin/_types/area";
export declare const initialWorkbench: Workbench;
export declare const generateWorkbench: (workbench: Workbench, areaTransform: Transform, area: AreaPlugin<Schemes, AreaExtra>, editor: NodeEditor<Schemes>) => void;
