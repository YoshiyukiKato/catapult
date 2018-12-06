import {execAsync} from "../exec-async";
import {vegeta, IVegetaPlotConfig, IVegetaAttackConfig, IVegetaEncodeConfig, IVegetaReportConfig} from "./command";

class Pipeline {
  private commands: string[] = [];
  private pipe(): string{
    return this.commands.join(" | ");
  }
  
  public add(command:string): Pipeline{
    this.commands.push(command);
    return this;
  }

  public inspect(): Pipeline{
    console.log(this.pipe());
    return this;
  }

  public async exec(): Promise<{stdout:string, stderr: string}>{
    return await execAsync(this.pipe());
  }
}

export class VegetaPipeline extends Pipeline {
  public attack(config?: IVegetaAttackConfig): VegetaPipeline{
    this.add(vegeta.attack(config));
    return this;
  }
  
  public encode(config?: IVegetaEncodeConfig): VegetaPipeline{
    this.add(vegeta.encode(config));
    return this;
  }
  
  public plot(config?: IVegetaPlotConfig): VegetaPipeline{
    this.add(vegeta.plot(config));
    return this;
  }
  
  public report(config?: IVegetaReportConfig): VegetaPipeline{
    this.add(vegeta.report(config));
    return this;
  }
}