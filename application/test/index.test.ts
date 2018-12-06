import "mocha";
import * as assert from "power-assert";
import {targetServer} from "./fixture/target-server";

import {JobStoreService} from "../src/service/job-store-service/job-store-service";
import {JobExecMaster} from "../src/service/job-exec-service/job-exec-master";
import {JobExecSlave} from "../src/service/job-exec-service/job-exec-slave";

const TARGET_SERVER_PORT = 8080;

const store = new JobStoreService();
const master = new JobExecMaster();
const slave = new JobExecSlave();

describe("catapult", () => {
  describe("store service", () => {
    it("creates new job", async () => {
      const jobConfig = {
        targetEndpoint: "http://localhost:3000",
        targets: [
          {
            url: "http://localhost:3000",
            method: "GET"
          }
        ]
      };
      const job = await store.createJob(jobConfig);
      assert(job);
    });
  });

  describe("exec service", () => {
    before(() => {
      master.startWorker();
      slave.startWorker();
    });



    after(() => {

    });
  });
  
  before(() => {
    targetServer.listen(TARGET_SERVER_PORT);
  });
  
  after(() => {
    targetServer.close();
  });
});