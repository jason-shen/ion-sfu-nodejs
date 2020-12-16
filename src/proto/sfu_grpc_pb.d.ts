// package: sfu
// file: sfu.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as sfu_pb from "./sfu_pb";

interface ISFUService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    signal: ISFUService_ISignal;
}

interface ISFUService_ISignal extends grpc.MethodDefinition<sfu_pb.SignalRequest, sfu_pb.SignalReply> {
    path: "/sfu.SFU/Signal";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<sfu_pb.SignalRequest>;
    requestDeserialize: grpc.deserialize<sfu_pb.SignalRequest>;
    responseSerialize: grpc.serialize<sfu_pb.SignalReply>;
    responseDeserialize: grpc.deserialize<sfu_pb.SignalReply>;
}

export const SFUService: ISFUService;

export interface ISFUServer {
    signal: grpc.handleBidiStreamingCall<sfu_pb.SignalRequest, sfu_pb.SignalReply>;
}

export interface ISFUClient {
    signal(): grpc.ClientDuplexStream<sfu_pb.SignalRequest, sfu_pb.SignalReply>;
    signal(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<sfu_pb.SignalRequest, sfu_pb.SignalReply>;
    signal(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<sfu_pb.SignalRequest, sfu_pb.SignalReply>;
}

export class SFUClient extends grpc.Client implements ISFUClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public signal(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<sfu_pb.SignalRequest, sfu_pb.SignalReply>;
    public signal(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<sfu_pb.SignalRequest, sfu_pb.SignalReply>;
}
