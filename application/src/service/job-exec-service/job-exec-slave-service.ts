import {VegetaPipeline} from "../../vendor/vegeta/exec";
import {jobExecSlave} from "./job-exec-slave";
import { IJob, IJobResult } from "../../lib/model";

export class JobExecSlaveService {
  public startWorker() {
    jobExecSlave.startListenExecRequest((channel, request) => {
      console.log("request: ", request);
      const job:IJob = JSON.parse(request);
      const vegeta = new VegetaPipeline();
      const attackConfig = (({attack,global,targetList}) => ({attack,global,targetList}))(job.vegetaOptions);
      const encodeConfig = (({encode,global}) => ({encode,global}))(job.vegetaOptions);
      const reportConfig = (({report,global}) => ({report,global}))(job.vegetaOptions);
      return vegeta.attack(attackConfig).encode(encodeConfig).report(reportConfig).exec()
        .then(({stdout, stderr}) => {
          const jobResult:IJobResult = {
            id: job.id,
            vegetaResult: JSON.parse(stdout)
          };
          jobExecSlave.responseExec(jobResult);
        })
        .catch(console.error);
    });
  }
  public stopWorker() {
    jobExecSlave.stopListenExecRequest();
  }
}
