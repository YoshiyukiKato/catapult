import {createClient} from "../../vendor/redis/create-client";
import { Callback } from "redis";

const slavePubClient = createClient();
const slaveSubClient = createClient();

export class JobExecSlave {
  public startListenExecRequest(cb:Callback<string>): void {
    slaveSubClient.on("message", cb);
    slaveSubClient.subscribe("exec-job-request");
  }

  public stopListenExecRequest(): void {
    slaveSubClient.unsubscribe("exec-job-request");
  }

  public responseExec(result): void {
    slavePubClient.publish("exec-job-response", JSON.stringify(result));
  }
}

export const jobExecSlave = new JobExecSlave();