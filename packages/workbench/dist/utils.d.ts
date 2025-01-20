import { AreaPlugin } from "rete-area-plugin";
import { AreaExtra, Schemes, Workbench } from "./types";
import { NodeEditor } from "rete";
import { Transform } from "rete-area-plugin/_types/area";
import { ElkNode } from "elkjs/lib/elk.bundled.js";
export declare const elk: import("elkjs/lib/elk-api").ELK;
export declare const elkLayoutFromWorkbench: (wb: Workbench, area: AreaPlugin<Schemes, AreaExtra>) => ElkNode;
export declare const generateWorkbench: (workbench: Workbench, areaTransform: Transform, area: AreaPlugin<Schemes, AreaExtra>, editor: NodeEditor<Schemes>) => void;
export declare const autoArrange: (workbench: Workbench, area: AreaPlugin<Schemes, AreaExtra>) => Promise<{
    nodes: import("./types").Node[];
    connections: import("./types").Connection[];
}>;
