import {VegetaPipeline} from "../../vendor/vegeta/exec";
import {jobExecClient} from "./job-exec-client";
import { IJob } from "../../lib/model";

export class JobExecSlave {
  public async startWorker() {
    const job:IJob = JSON.parse(await jobExecClient.startListenExecRequest());
    const vegeta = new VegetaPipeline();
    const attackConfig = (({attack,global,targetList}) => ({attack,global,targetList}))(job.vegetaOptions);
    const encodeConfig = (({encode,global}) => ({encode,global}))(job.vegetaOptions);
    const reportConfig = (({report,global}) => ({report,global}))(job.vegetaOptions);
    const {stdout, stderr} = await vegeta.attack(attackConfig).encode(encodeConfig).report(reportConfig).exec();
    await jobExecClient.responseExec(stdout);
  }
}
