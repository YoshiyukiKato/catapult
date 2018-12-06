import {IJob, Status} from "../../lib/model";
import {jobExecClient} from "./job-exec-client";
import {JobStoreService} from "../job-store-service/job-store-service";

const jobStoreService = new JobStoreService();

export class JobExecMaster {
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
    await jobExecClient.requestExec(job);
    await jobStoreService.updateJob(job.id, { status: Status.Running, updatedAt: Date.now() });
  }
  
  private watchJobRunnable() {
    setInterval(() => {
      const runnableJob = this.findJobRunnable();
      if(runnableJob){
        this.requestExec(runnableJob);
      }
    }, 1000);
  }

  private async startListenExecResponse() {
    const response:any = await jobExecClient.startListenExecResponse();
    console.log(response);
    await jobStoreService.updateJob(response.id, { status: Status.Succeed, updatedAt: Date.now() });
  }

  public async startWorker() {
    this.watchJobRunnable();
    await this.startListenExecResponse();
  }
}