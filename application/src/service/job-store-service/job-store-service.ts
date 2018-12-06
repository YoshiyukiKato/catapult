
import {v4 as uuidV4} from "uuid";
import {IJob, IJobConfig, Status} from "../../lib/model";
import {jobStoreClient} from "./job-store-client";

export class JobStoreService {
  private createInitialJob({targetEndpoint, vegetaOptions}: IJobConfig): IJob {
    return {
      id: uuidV4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: Status.Registerd,
      targetEndpoint,
      vegetaOptions
    };
  }

  public async createJob(jobConfig: IJobConfig): Promise<IJob> {
    const job = this.createInitialJob(jobConfig)
    await jobStoreClient.set(job.id, job);
    return job;
  }

  public async fetchJob(jobId: string): Promise<IJob> {
    return await jobStoreClient.get(jobId);
  }

  public async updateJob(jobId: string, changedState: any): Promise<IJob> {
    const currentState = await jobStoreClient.get(jobId);
    const nextState = { ...currentState, ...changedState };
    await jobStoreClient.set(jobId, nextState);
    return nextState;
  }

  public async deleteJob(jobId: string): Promise<number> {
    return await jobStoreClient.del(jobId);
  }

  public async findJob(condition: (job: any) => boolean): Promise<IJob|undefined> {
    const jobs = await jobStoreClient.all();
    return jobs.find(condition);
  }

  public async findJobs(condition: (job: any) => boolean = (item) => true): Promise<IJob[]> {
    const jobs = await jobStoreClient.all();
    return jobs.filter(condition);
  }
}