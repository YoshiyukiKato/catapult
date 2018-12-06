import {createClient} from "./create-client";

const client = createClient();

class RedisAsyncClient {
  public async hgetall(key: string): Promise<{[key: string]: string}> {
    return new Promise<{[key: string]: string}>((resolve, reject) => {
      client.hgetall(key, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    }); 
  }

  public async hget(key:string, field: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      client.hget(key, field, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    }); 
  }
  
  public async hset(key: string, field: string, value: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      client.hset(key, field, value, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  public async hdel(key: string, field: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      client.hdel(key, field, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  public async publish(key: string, value: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      client.publish(key, value, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  public async subcribe(key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      client.subscribe(key, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  public async unsubcribe(key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      client.unsubscribe(key, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  public async rpush(key: string, value: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      client.rpush(key, value, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  public async lpop(key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      client.lpop(key, (err, result) => {
        if(err){
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  public async llen(key: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      client.llen(key, (err, result) => {
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