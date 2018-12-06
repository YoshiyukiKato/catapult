import {execVegeta} from "../../lib/exec-vegeta";
import {jobExecClient} from "./job-exec-client";
import { IJob } from "../../lib/model";


export class JobExecSlave {
  public async startWorker() {
    const job:IJob = JSON.parse(await jobExecClient.startListenExecRequest());
    const {stdout, stderr} = await execVegeta(job.targets);
    await jobExecClient.responseExec(stdout);
  }
}
