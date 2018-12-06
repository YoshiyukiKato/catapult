import redis from "redis"

export function createClient(){
  return redis.createClient({
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT || "6379")
  });
}