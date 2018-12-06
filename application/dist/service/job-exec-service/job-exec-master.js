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
const model_1 = require("../../lib/model");
const job_exec_client_1 = require("./job-exec-client");
const job_store_service_1 = require("../job-store-service/job-store-service");
const jobStoreService = new job_store_service_1.JobStoreService();
class JobExecMaster {
    findJobRunnable() {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield jobStoreService.findJobs();
            const runningJobs = jobs.filter((job) => job.status === model_1.Status.Running || job.status === model_1.Status.Runnable);
            const runnableJobs = jobs.filter((job) => {
                return job.status === model_1.Status.Registerd
                    && runningJobs.reduce((acc, runningJob) => {
                        return acc && job.targetEndpoint !== runningJob.targetEndpoint;
                    }, true);
            });
            const runnableJob = runnableJobs.sort((jobA, jobB) => jobA.createdAt > jobB.createdAt ? 1 : -1)[0];
            if (runnableJob) {
                yield jobStoreService.updateJob(runnableJob.id, { status: model_1.Status.Runnable, updatedAt: Date.now() });
            }
            return runnableJob;
        });
    }
    requestExec(job) {
        return __awaiter(this, void 0, void 0, function* () {
            yield job_exec_client_1.jobExecClient.requestExec(job);
            yield jobStoreService.updateJob(job.id, { status: model_1.Status.Running, updatedAt: Date.now() });
        });
    }
    watchJobRunnable() {
        setTimeout(() => {
            const runnableJob = this.findJobRunnable();
            if (runnableJob) {
                this.requestExec(runnableJob);
            }
        }, 10000);
    }
    startListenExecResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield job_exec_client_1.jobExecClient.startListenExecResponse();
            console.log(response);
            yield jobStoreService.updateJob(response.id, { status: model_1.Status.Succeed, updatedAt: Date.now() });
        });
    }
    startWorker() {
        return __awaiter(this, void 0, void 0, function* () {
            this.watchJobRunnable();
            yield this.startListenExecResponse();
        });
    }
}
exports.JobExecMaster = JobExecMaster;
