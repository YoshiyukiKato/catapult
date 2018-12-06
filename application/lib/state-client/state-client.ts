import {redisAsyncClient} from "../redis-async-client";

export class StateClient<State> {
  private namespace: string;
  constructor(namespace: string){
    this.namespace = namespace;
  }

  public async all(): Promise<State[]> {
    const states = await redisAsyncClient.hgetall(this.namespace);
    return Object.values(states).map((state) => JSON.parse(state));
  }

  public async get(itemId: string): Promise<State> {
    return JSON.parse(await redisAsyncClient.hget(this.namespace, itemId));
  }

  public async set(itemId: string, state: State): Promise<number> {
    return redisAsyncClient.hset(this.namespace, itemId, JSON.stringify(state));
  }

  public async del(itemId: string): Promise<number> {
    return redisAsyncClient.hdel(this.namespace, itemId);
  }
}