import redis from "redis"

const client = redis.createClient({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT || "6379")
});

class RedisAsyncClient {
  public async hget(key:string, field: string) {
    return new Promise((resolve, reject) => {
      client.hget(key, field, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    }); 
  }
  
  public async hset(key: string, field: string, value: string) {
    return new Promise((resolve, reject) => {
      client.hset(key, field, value, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  public async hdel(key: string, field: string) {
    return new Promise((resolve, reject) => {
      client.hdel(key, field, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  public async rpush(key: string, value: string) {
    return new Promise((resolve, reject) => {
      client.rpush(key, value, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  public async lpop(key: string) {
    return new Promise((resolve, reject) => {
      client.lpop(key, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}

export const redisAsyncClient = new RedisAsyncClient();