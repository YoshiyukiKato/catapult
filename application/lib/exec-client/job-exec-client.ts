import {redisAsyncClient} from "../redis-async-client";

export class JobExecClient {
  public async requestExec(job) {
    return await redisAsyncClient.publish("exec-job-request", job);
  }

  public async startListenExecRequest() {
    return await redisAsyncClient.subcribe("exec-job-request");
  }

  public async stopListenExecRequest() {
    return await redisAsyncClient.unsubcribe("exec-job-request");
  }

  public async responseExec(result) {
    return await redisAsyncClient.publish("exec-job-response", result);
  }

  public async startListenExecResponse() {
    return await redisAsyncClient.subcribe("exec-job-response");
  }

  public async stopListenExecResponse() {
    return await redisAsyncClient.unsubcribe("exec-job-response");
  }
}

export const jobExecClient = new JobExecClient();