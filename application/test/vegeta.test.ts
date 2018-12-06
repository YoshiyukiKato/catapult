import assert from "power-assert";
import {targetServer} from "./fixture/target-server";
import {jobConfig} from "./fixture/job-config";
import {VegetaPipeline} from "../src/vendor/vegeta/exec";
import path from "path";

const TARGET_SERVER_PORT = 3000;

describe("vegeta executer", () => {
  before(() => {
    targetServer.listen(TARGET_SERVER_PORT);
  });
  
  it("exec vegeta for targets", () => {
    const vegeta = new VegetaPipeline();
    const {targets} = jobConfig;
    const attackConfig = {
      attack: {
        format: "json",
        duration: "5s",
        rate: "100/s",
      },
      targetList: [{"url":"http://localhost:3000","method":"GET"}, {"url":"http://localhost:3000","method":"GET"}]
    };
    
    const reportConfig = {
      report: {
        type: "json"
      }
    };
    
    return vegeta.attack(attackConfig).encode().report(reportConfig).exec()
      .then(({stdout, stderr}) => {
        console.log(stdout);
        assert(stdout);
      })
      .catch(console.error);
  });

  after(() => {
    targetServer.close();
  });
});