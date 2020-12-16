import { Base64 } from "js-base64";
import {EventEmitter} from 'events';
import client from "./conn"
import { JoinRequest, SignalReply, SignalRequest, Trickle } from "./proto/sfu_pb";
import grpc from "grpc";


class ionSfu extends EventEmitter {
  event: EventEmitter;
  private Call: grpc.ClientDuplexStream<SignalRequest, SignalReply>;

  constructor() {
    super()
    this.event = new EventEmitter();
    this.Call = client.signal();
    this.Call.on("data", (signalreply: SignalReply) => {
      // console.log("incoming", signalreply)
      const res = signalreply.getPayloadCase();
      switch (res) {
        case SignalReply.PayloadCase.JOIN:
            this.event.emit("onJoin", signalreply.getId(), Base64.decode(signalreply.getJoin().getDescription_asB64()))
           // console.log("onjoin", signalreply.getId(), Base64.decode(signalreply.getJoin().getDescription_asB64()));
          break;
        case SignalReply.PayloadCase.DESCRIPTION:
          this.event.emit("onDescription", Base64.decode(signalreply.getDescription_asB64()));
         // console.log("onDescription", Base64.decode(signalreply.getDescription_asB64()))
          break;
        case SignalReply.PayloadCase.TRICKLE:
          this.event.emit("onTrickle", signalreply.getTrickle().getTarget(), signalreply.getTrickle().getInit());
          //console.log("onCadadidate", signalreply.getTrickle().getTarget());
         // console.log("oncan", signalreply.getTrickle().getInit());
          break;
        case SignalReply.PayloadCase.ICECONNECTIONSTATE:
          this.event.emit("onIceconnectionstate", signalreply.getIceconnectionstate())
         // console.log("icestatechanged: ", signalreply.getIceconnectionstate());
        case SignalReply.PayloadCase.ERROR:
          this.event.emit("onError", signalreply.getError());
          //console.log("on Error");
          break;
        default:
          break;
      }
   })
  }
Join = (obj: string, id: string, sid: string) => {
  const request = new SignalRequest();
  const join = new JoinRequest();

  let dataoffer = Base64.encode(obj);
// console.log("object a", objJsonB64);
  request.setId(id);
  join.setSid(sid);
  join.setDescription(dataoffer);

  //  console.log(join)

  request.setJoin(join)
// console.log(request);
// const bufferedData = Buffer.from(JSON.stringify(request));
  this.Call.write(request);
}

Description = (obj: string) => {
  const request = new SignalRequest();
  let dataanswer = Base64.encode(obj);
  request.setDescription(dataanswer);

  this.Call.write(request);
}

Trickle = (target: any,obj: string) => {
  const requst = new SignalRequest();
  const trickle = new Trickle();
  trickle.setTarget(target)
  trickle.setInit(obj)
}

}

export default ionSfu;
