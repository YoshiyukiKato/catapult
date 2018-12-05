import {redisAsyncClient} from "../redis-async-client";

export class StateClient {
  private namespace: string;
  constructor(namespace: string){
    this.namespace = namespace;
  }

  public async get(itemId: string) {
    return redisAsyncClient.hget(this.namespace, itemId);
  }
  
  public async set(itemId: string, state: any) {
    return redisAsyncClient.hset(this.namespace, itemId, JSON.stringify(state));
  }

  public async del(itemId: string) {
    return redisAsyncClient.hdel(this.namespace, itemId);
  }
}