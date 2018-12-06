import {IVegetaTarget, IVegetaAttackOptions, IVegetaReportOptions, IVegetaEncodeOptions, IVegetaGlobalOptions, IVegetaPlotOptions} from "../vendor/vegeta/model";

export enum Status {
  Registerd = "REGISTERED",
  Runnable = "RUNNABLE",
  Running = "RUNNING",
  Succeed = "SUCCEED",
  Failed = "FAILD"
}

export interface IVegetaOptions {
  global: IVegetaGlobalOptions;
  attack: IVegetaAttackOptions;
  encode: IVegetaEncodeOptions;
  report: IVegetaReportOptions;
  plot: IVegetaPlotOptions;
}

export interface IJobConfig {
  targetEndpoint: string;
  vegetaOptions: IVegetaOptions
}

export interface IJob extends IJobConfig{
  id: string;
  createdAt: number;
  updatedAt: number;
  status: Status;
}
