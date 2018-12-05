import {JobQueueController} from "./job-queue-controller";
import {JobStateController} from "./job-state-controller";

const jobQueueController = new JobQueueController();
const jobStateController = new JobStateController();

export class JobExecController {
  private async validateJob() {}
  public async fetchJob() {}
  public async startExec() {}
  public async stopExec() {}
  public async watchExec() {}
}