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
const exec_async_1 = require("../../vendor/exec-async");
const job_exec_client_1 = require("./job-exec-client");
class JobExecSlave {
    startWorker() {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield job_exec_client_1.jobExecClient.startListenExecRequest();
            const { stdout, stderr } = yield exec_async_1.execAsync(`vegeta attack -format=json ${JSON.stringify(job)} | vegeta encode`);
            yield job_exec_client_1.jobExecClient.responseExec(stdout);
        });
    }
}
exports.JobExecSlave = JobExecSlave;
