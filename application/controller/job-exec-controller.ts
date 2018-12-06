import {jobExecClient} from "../lib/exec-client/job-exec-client";
import {JobStateController} from "./job-state-controller";

const jobStateController = new JobStateController();

export class JobExecController {
  /**
   * there are no running job satisfying conditions:
   * - item.endpoint === aRunningJob.endpoint
   */
  private async findJobRunnable(): Promise<any> {
    const jobs = await jobStateController.findJobs();
    const runningJobs = jobs.filter((job) => job.status === "running" || job.status === "runnable");
    const runnableJobs = jobs.filter((job) => { 
      return job.status === "registered" 
        && runningJobs.reduce((acc, runningJob) => { 
          return acc && job.endpoint !== runningJob.endpoint;
        }, true);
    });
    const runnableJob = runnableJobs.sort((jobA, jobB) => jobA.createdAt > jobB.createdAt ? 1 : -1)[0];
    if(runnableJob){
      await jobStateController.updateJob(runnableJob.id, { status: "runnable", updatedAt: Date.now() });
    }
    return runnableJob;
  }

  private async startJob(job) {
    await jobExecClient.requestExec(job);
    await jobStateController.updateJob(job.id, { status: "running", updatedAt: Date.now() });
  }
  
  public async watchJobRunnable() {
    setTimeout(() => {
      const runnableJob = this.findJobRunnable();
      if(runnableJob){
        this.startJob(runnableJob);
      }
    }, 10000);
  }

  public async watchJobExec() {
    const response = await jobExecClient.startListenExecResponse();
    console.log(response);
  }
}