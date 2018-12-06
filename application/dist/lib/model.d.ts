import { IVegetaTarget } from "../vendor/vegeta";
export declare enum Status {
    Registerd = "REGISTERED",
    Runnable = "RUNNABLE",
    Running = "RUNNING",
    Succeed = "SUCCEED",
    Failed = "FAILD"
}
export interface IJobConfig {
    targetEndpoint: string;
    targets: IVegetaTarget[];
}
export interface IJob {
    id: string;
    createdAt: number;
    updatedAt: number;
    status: Status;
    targetEndpoint: string;
    targets: IVegetaTarget[];
}
