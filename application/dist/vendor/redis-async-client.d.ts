declare class RedisAsyncClient {
    hgetall(key: string): Promise<{
        [key: string]: string;
    }>;
    hget(key: string, field: string): Promise<string>;
    hset(key: string, field: string, value: string): Promise<number>;
    hdel(key: string, field: string): Promise<number>;
    publish(key: string, value: string): Promise<number>;
    subcribe(key: string): Promise<string>;
    unsubcribe(key: string): Promise<string>;
    rpush(key: string, value: string): Promise<number>;
    lpop(key: string): Promise<string>;
    llen(key: string): Promise<number>;
}
export declare const redisAsyncClient: RedisAsyncClient;
export {};
