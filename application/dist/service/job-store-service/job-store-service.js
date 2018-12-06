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
const uuid_1 = require("uuid");
const model_1 = require("../../lib/model");
const job_store_client_1 = require("./job-store-client");
class JobStoreService {
    createInitialJob({ targetEndpoint, targets }) {
        return {
            id: uuid_1.v4(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            status: model_1.Status.Registerd,
            targetEndpoint,
            targets
        };
    }
    createJob(jobConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = this.createInitialJob(jobConfig);
            return yield job_store_client_1.jobStoreClient.set(job.id, job);
        });
    }
    fetchJob(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield job_store_client_1.jobStoreClient.get(jobId);
        });
    }
    updateJob(jobId, changedState) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentState = yield job_store_client_1.jobStoreClient.get(jobId);
            const nextState = Object.assign({}, currentState, changedState);
            return yield job_store_client_1.jobStoreClient.set(jobId, nextState);
        });
    }
    deleteJob(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield job_store_client_1.jobStoreClient.del(jobId);
        });
    }
    findJob(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield job_store_client_1.jobStoreClient.all();
            return jobs.find(condition);
        });
    }
    findJobs(condition = (item) => true) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield job_store_client_1.jobStoreClient.all();
            return jobs.filter(condition);
        });
    }
}
exports.JobStoreService = JobStoreService;
