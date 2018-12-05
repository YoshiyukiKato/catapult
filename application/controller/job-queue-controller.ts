import {jobQueueClient} from "../lib/queue-client/job-queue-client";
import {JobStateController} from "./job-state-controller";

const jobStateController = new JobStateController();

export class JobQueueController {
  public async enqueue(job:any) {
    await jobQueueClient.enqueue(job);
    jobStateController.updateJob(job.id, { step: "enqueued", updatedAt: Date.now() });
  }

  public async dequeue() {
    const job:any = await jobQueueClient.dequeue();
    jobStateController.updateJob(job.id, { step: "dequeued", updatedAt: Date.now() });
    return job;
  }
}