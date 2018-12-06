import "mocha";
import assert from "power-assert";
import {targetServer} from "./fixture/target-server";

import {JobStoreService} from "../src/service/job-store-service/job-store-service";
import {JobExecMasterService} from "../src/service/job-exec-service/job-exec-master-service";
import {JobExecSlaveService} from "../src/service/job-exec-service/job-exec-slave-service";

const TARGET_SERVER_PORT = 3000;

const store = new JobStoreService();
const master = new JobExecMasterService();
const slave = new JobExecSlaveService();

describe("catapult", () => {
  describe("store service", () => {
    it("creates new job", async () => {
      const jobConfig = {
        targetEndpoint: "http://localhost:3000",
        vegetaOptions:{
          attack: {
            format: "json",
            duration: "1s",
            rate: "100",
          },
          report: {
            type: "json"
          },
          targetList: [
            {
              url: "http://localhost:3000",
              method: "GET"
            }
          ]
        }
      };
      const job = await store.createJob(jobConfig);
      assert(job);
    });
  });


  describe("exec service", () => {
    it("worker", () => {
      slave.startWorker();
      master.startWorker();
    });
    
    after(() => {
      master.stopWorker();
      slave.stopWorker();
    });
  });
  
  before(() => {
    targetServer.listen(TARGET_SERVER_PORT);
  });
  
  after(() => {
    targetServer.close();
  });
});