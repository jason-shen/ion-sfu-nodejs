// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var sfu_pb = require('./sfu_pb.js');

function serialize_sfu_SignalReply(arg) {
  if (!(arg instanceof sfu_pb.SignalReply)) {
    throw new Error('Expected argument of type sfu.SignalReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sfu_SignalReply(buffer_arg) {
  return sfu_pb.SignalReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sfu_SignalRequest(arg) {
  if (!(arg instanceof sfu_pb.SignalRequest)) {
    throw new Error('Expected argument of type sfu.SignalRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sfu_SignalRequest(buffer_arg) {
  return sfu_pb.SignalRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var SFUService = exports.SFUService = {
  signal: {
    path: '/sfu.SFU/Signal',
    requestStream: true,
    responseStream: true,
    requestType: sfu_pb.SignalRequest,
    responseType: sfu_pb.SignalReply,
    requestSerialize: serialize_sfu_SignalRequest,
    requestDeserialize: deserialize_sfu_SignalRequest,
    responseSerialize: serialize_sfu_SignalReply,
    responseDeserialize: deserialize_sfu_SignalReply,
  },
};

exports.SFUClient = grpc.makeGenericClientConstructor(SFUService);
