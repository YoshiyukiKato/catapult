import {createClient} from "../../vendor/redis/create-client";
import { Callback } from "redis";

const masterPubClient = createClient();
const masterSubClient = createClient();

export class JobExecMaster {
  public requestExec(job): void {
    masterPubClient.publish("exec-job-request", JSON.stringify(job));
  }
  
  public startListenExecResponse(cb:Callback<string>): void {
    masterSubClient.on("message", cb);
    masterSubClient.subscribe("exec-job-response");
  }

  public stopListenExecResponse(): void {
    masterSubClient.unsubscribe("exec-job-response");
  }
}

export const jobExecMaster = new JobExecMaster();