"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_async_client_1 = require("../../vendor/redis-async-client");
class StoreClient {
    constructor(namespace) {
        this.namespace = namespace;
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const stores = yield redis_async_client_1.redisAsyncClient.hgetall(this.namespace);
            return Object.values(stores).map((store) => JSON.parse(store));
        });
    }
    get(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse(yield redis_async_client_1.redisAsyncClient.hget(this.namespace, itemId));
        });
    }
    set(itemId, store) {
        return __awaiter(this, void 0, void 0, function* () {
            return redis_async_client_1.redisAsyncClient.hset(this.namespace, itemId, JSON.stringify(store));
        });
    }
    del(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return redis_async_client_1.redisAsyncClient.hdel(this.namespace, itemId);
        });
    }
}
exports.StoreClient = StoreClient;
