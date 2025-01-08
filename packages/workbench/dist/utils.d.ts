import { AreaPlugin } from "rete-area-plugin";
import { AreaExtra, Schemes, Workbench } from "./types";
import { NodeEditor } from "rete";
export declare const initialWorkbench: Workbench;
export declare const generateWorkbench: (workbench: Workbench, area: AreaPlugin<Schemes, AreaExtra>, editor: NodeEditor<Schemes>) => void;
