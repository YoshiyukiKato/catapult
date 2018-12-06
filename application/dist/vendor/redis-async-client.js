"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient({
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT || "6379")
});
class RedisAsyncClient {
    hgetall(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                client.hgetall(key, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
    hget(key, field) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                client.hget(key, field, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
    hset(key, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                client.hset(key, field, value, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
    hdel(key, field) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                client.hdel(key, field, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
    publish(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                client.publish(key, value, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
    subcribe(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                client.subscribe(key, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
    unsubcribe(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                client.unsubscribe(key, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
    rpush(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                client.rpush(key, value, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
    lpop(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                client.lpop(key, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
    llen(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                client.llen(key, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
}
exports.redisAsyncClient = new RedisAsyncClient();
