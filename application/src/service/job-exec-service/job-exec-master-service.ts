import {IJob, Status, IJobResult} from "../../lib/model";
import {jobExecMaster} from "./job-exec-master";
import {JobStoreService} from "../job-store-service/job-store-service";

const jobStoreService = new JobStoreService();

export class JobExecMasterService {
  private interval?: NodeJS.Timeout;
  private async findJobRunnable(): Promise<any> {
    const jobs = await jobStoreService.findJobs();
    const runningJobs = jobs.filter((job) => job.status === Status.Running || job.status === Status.Runnable);
    const runnableJobs = jobs.filter((job) => {
      return job.status === Status.Registerd 
        && runningJobs.reduce((acc, runningJob) => { 
          return acc && job.targetEndpoint !== runningJob.targetEndpoint;
        }, true);
    });
    const runnableJob = runnableJobs.sort((jobA, jobB) => jobA.createdAt > jobB.createdAt ? 1 : -1)[0];
    if(runnableJob){
      await jobStoreService.updateJob(runnableJob.id, { status: Status.Runnable, updatedAt: Date.now() });
    }
    return runnableJob;
  }

  private async requestExec(job) {
    await jobExecMaster.requestExec(job);
    await jobStoreService.updateJob(job.id, { status: Status.Running, updatedAt: Date.now() });
  }
  
  private watchJobRunnable() {
    this.interval = setInterval(() => {
      return this.findJobRunnable()
        .then((runnableJob) => {
          if(runnableJob){
            this.requestExec(runnableJob);
          }
        })
        .catch(console.error);
    }, 1000);
  }

  public startListenExecResponse() {
    jobExecMaster.startListenExecResponse((channel, response) => {
      const result:IJobResult = JSON.parse(response);
      return jobStoreService.updateJob(result.id, { status: Status.Succeed, updatedAt: Date.now() })
        .then()
        .catch(console.error);
    });
  }

  public startWorker() {
    this.watchJobRunnable();
    this.startListenExecResponse();
  }

  public stopWorker() {
    if(this.interval){
      clearInterval(this.interval);
    }
    jobExecMaster.stopListenExecResponse();
  }
}