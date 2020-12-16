/// <reference types="node" />
import { EventEmitter } from 'events';
declare class ionSfu extends EventEmitter {
    event: EventEmitter;
    private Call;
    constructor();
    Join: (obj: string, id: string, sid: string) => void;
    Description: (obj: string) => void;
    Trickle: (target: any, obj: string) => void;
}
export default ionSfu;
//# sourceMappingURL=index.d.ts.map