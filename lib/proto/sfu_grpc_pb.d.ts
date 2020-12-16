/// <reference types="grpc" />
export namespace SFUService {
    namespace signal {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./sfu_pb.js").SignalRequest;
        export const responseType: typeof import("./sfu_pb.js").SignalReply;
        export { serialize_sfu_SignalRequest as requestSerialize };
        export { deserialize_sfu_SignalRequest as requestDeserialize };
        export { serialize_sfu_SignalReply as responseSerialize };
        export { deserialize_sfu_SignalReply as responseDeserialize };
    }
}
export var SFUClient: typeof import("grpc").Client;
declare function serialize_sfu_SignalRequest(arg: any): Buffer;
declare function deserialize_sfu_SignalRequest(buffer_arg: any): import("./sfu_pb.js").SignalRequest;
declare function serialize_sfu_SignalReply(arg: any): Buffer;
declare function deserialize_sfu_SignalReply(buffer_arg: any): import("./sfu_pb.js").SignalReply;
export {};
//# sourceMappingURL=sfu_grpc_pb.d.ts.map