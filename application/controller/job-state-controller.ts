import {jobStateClient} from "../lib/state-client/job-state-client";

export interface IJobConfig {}

export class Job {
  public state: any;
  constructor(state: any) {
    this.state = state;
  }
}

export class JobStateController {
  private createInitialState(jobId:string, jobConfig: IJobConfig): any {
    return {
      jobId: jobId
    };
    //TODO: add converter for jobConfig => initialState
  }

  public async createJob(jobConfig: IJobConfig) {
    const jobId = "CREATE NEW ID";
    await jobStateClient.set(jobId, this.createInitialState(jobId, jobConfig));
  }

  public async findJob(jobId: string) {
    await jobStateClient.get(jobId);
  }

  public async updateJob(jobId: string, changedState: any) {
    const currentState = await jobStateClient.get(jobId);
    const nextState = { ...currentState, ...changedState };
    await jobStateClient.set(jobId, nextState);
  }

  public async deleteJob(jobId: string) {
    await jobStateClient.del(jobId);
  }
}