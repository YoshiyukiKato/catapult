import {jobStateClient} from "../lib/state-client/job-state-client";

export interface IJobConfig {}

export class JobStateController {
  private createInitialState(jobId:string, jobConfig: IJobConfig): any {
    return {
      jobId: jobId
    };
    //TODO: add converter for jobConfig => initialState
  }

  public async createJob(jobConfig: IJobConfig): Promise<number> {
    const jobId = "CREATE NEW ID";
    return await jobStateClient.set(jobId, this.createInitialState(jobId, jobConfig));
  }

  public async fetchJob(jobId: string): Promise<any> {
    return await jobStateClient.get(jobId);
  }

  public async updateJob(jobId: string, changedState: any): Promise<number> {
    const currentState = await jobStateClient.get(jobId);
    const nextState = { ...currentState, ...changedState };
    return await jobStateClient.set(jobId, nextState);
  }

  public async deleteJob(jobId: string) {
    await jobStateClient.del(jobId);
  }

  public async findJob(condition: (job: any) => boolean): Promise<any> {
    const jobs = await jobStateClient.all();
    return jobs.find(condition);
  }

  public async findJobs(condition: (job: any) => boolean = (item) => true): Promise<any[]> {
    const jobs = await jobStateClient.all();
    return jobs.filter(condition);
  }
}