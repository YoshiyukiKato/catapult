import {redisAsyncClient} from "../../vendor/redis-async-client";

export class StoreClient<Store> {
  private namespace: string;
  constructor(namespace: string){
    this.namespace = namespace;
  }

  public async all(): Promise<Store[]> {
    const stores = await redisAsyncClient.hgetall(this.namespace);
    return Object.values<string>(stores).map((store) => JSON.parse(store));
  }

  public async get(itemId: string): Promise<Store> {
    return JSON.parse(await redisAsyncClient.hget(this.namespace, itemId));
  }

  public async set(itemId: string, store: Store): Promise<number> {
    return redisAsyncClient.hset(this.namespace, itemId, JSON.stringify(store));
  }

  public async del(itemId: string): Promise<number> {
    return redisAsyncClient.hdel(this.namespace, itemId);
  }
}