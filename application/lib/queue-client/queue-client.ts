import {redisAsyncClient} from "../redis-async-client";

export class QueueClient {
  private namespace: string;
  constructor(namespace: string){
    this.namespace = namespace;
  }

  public async enqueue(item: any) {
    return redisAsyncClient.rpush(this.namespace, JSON.stringify(item));
  }

  public async dequeue() {
    return redisAsyncClient.lpop(this.namespace);
  }
}