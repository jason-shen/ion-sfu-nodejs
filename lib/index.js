"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_base64_1 = require("js-base64");
const events_1 = require("events");
const conn_1 = __importDefault(require("./conn"));
const sfu_pb_1 = require("./proto/sfu_pb");
class ionSfu extends events_1.EventEmitter {
    constructor() {
        super();
        this.Join = (obj, id, sid) => {
            const request = new sfu_pb_1.SignalRequest();
            const join = new sfu_pb_1.JoinRequest();
            let dataoffer = js_base64_1.Base64.encode(obj);
            // console.log("object a", objJsonB64);
            request.setId(id);
            join.setSid(sid);
            join.setDescription(dataoffer);
            //  console.log(join)
            request.setJoin(join);
            // console.log(request);
            // const bufferedData = Buffer.from(JSON.stringify(request));
            this.Call.write(request);
        };
        this.Description = (obj) => {
            const request = new sfu_pb_1.SignalRequest();
            let dataanswer = js_base64_1.Base64.encode(obj);
            request.setDescription(dataanswer);
            this.Call.write(request);
        };
        this.Trickle = (target, obj) => {
            const requst = new sfu_pb_1.SignalRequest();
            const trickle = new sfu_pb_1.Trickle();
            trickle.setTarget(target);
            trickle.setInit(obj);
        };
        this.event = new events_1.EventEmitter();
        this.Call = conn_1.default.signal();
        this.Call.on("data", (signalreply) => {
            // console.log("incoming", signalreply)
            const res = signalreply.getPayloadCase();
            switch (res) {
                case sfu_pb_1.SignalReply.PayloadCase.JOIN:
                    this.event.emit("onJoin", signalreply.getId(), js_base64_1.Base64.decode(signalreply.getJoin().getDescription_asB64()));
                    // console.log("onjoin", signalreply.getId(), Base64.decode(signalreply.getJoin().getDescription_asB64()));
                    break;
                case sfu_pb_1.SignalReply.PayloadCase.DESCRIPTION:
                    this.event.emit("onDescription", js_base64_1.Base64.decode(signalreply.getDescription_asB64()));
                    // console.log("onDescription", Base64.decode(signalreply.getDescription_asB64()))
                    break;
                case sfu_pb_1.SignalReply.PayloadCase.TRICKLE:
                    this.event.emit("onTrickle", signalreply.getTrickle().getTarget(), signalreply.getTrickle().getInit());
                    //console.log("onCadadidate", signalreply.getTrickle().getTarget());
                    // console.log("oncan", signalreply.getTrickle().getInit());
                    break;
                case sfu_pb_1.SignalReply.PayloadCase.ICECONNECTIONSTATE:
                    this.event.emit("onIceconnectionstate", signalreply.getIceconnectionstate());
                // console.log("icestatechanged: ", signalreply.getIceconnectionstate());
                case sfu_pb_1.SignalReply.PayloadCase.ERROR:
                    this.event.emit("onError", signalreply.getError());
                    //console.log("on Error");
                    break;
                default:
                    break;
            }
        });
    }
}
exports.default = ionSfu;
//# sourceMappingURL=index.js.map