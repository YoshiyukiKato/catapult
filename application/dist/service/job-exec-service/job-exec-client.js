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
class JobExecClient {
    requestExec(job) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_async_client_1.redisAsyncClient.publish("exec-job-request", job);
        });
    }
    startListenExecRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_async_client_1.redisAsyncClient.subcribe("exec-job-request");
        });
    }
    stopListenExecRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_async_client_1.redisAsyncClient.unsubcribe("exec-job-request");
        });
    }
    responseExec(result) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_async_client_1.redisAsyncClient.publish("exec-job-response", result);
        });
    }
    startListenExecResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_async_client_1.redisAsyncClient.subcribe("exec-job-response");
        });
    }
    stopListenExecResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_async_client_1.redisAsyncClient.unsubcribe("exec-job-response");
        });
    }
}
exports.JobExecClient = JobExecClient;
exports.jobExecClient = new JobExecClient();
