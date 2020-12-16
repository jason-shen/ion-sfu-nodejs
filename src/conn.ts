import * as grpc from 'grpc';
import {SFUClient} from './proto/sfu_grpc_pb';

export default new SFUClient(
  `localhost:50051`,
    grpc.credentials.createInsecure(),
)