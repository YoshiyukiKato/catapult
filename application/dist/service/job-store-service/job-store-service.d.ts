import { IJob, IJobConfig } from "../../lib/model";
export declare class JobStoreService {
    private createInitialJob;
    createJob(jobConfig: IJobConfig): Promise<number>;
    fetchJob(jobId: string): Promise<IJob>;
    updateJob(jobId: string, changedState: any): Promise<number>;
    deleteJob(jobId: string): Promise<void>;
    findJob(condition: (job: any) => boolean): Promise<IJob | undefined>;
    findJobs(condition?: (job: any) => boolean): Promise<IJob[]>;
}
