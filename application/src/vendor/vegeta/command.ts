import { paramCase } from "change-case";
import { IVegetaGlobalOptions, IVegetaAttackOptions, IVegetaEncodeOptions, IVegetaPlotOptions, IVegetaReportOptions, IVegetaTarget } from "./model";

export interface IVegetaAttackConfig {
  global?: IVegetaGlobalOptions;
  attack?: IVegetaAttackOptions;
  targetList?: IVegetaTarget[];
}

export interface IVegetaEncodeConfig {
  global?: IVegetaGlobalOptions;
  encode?: IVegetaEncodeOptions;
}

export interface IVegetaPlotConfig {
  global?: IVegetaGlobalOptions;
  plot?: IVegetaPlotOptions;
}

export interface IVegetaReportConfig {
  global?: IVegetaGlobalOptions;
  report?: IVegetaReportOptions;
}

export const vegeta = {
  attack({global, attack, targetList=[]}:IVegetaAttackConfig={}){
    const arg = targetList.map((target) => JSON.stringify(target)).join("\n");
    return renderCommand("vegeta attack", global, attack, arg);
  },

  encode({global, encode}:IVegetaEncodeConfig={}){
    return renderCommand("vegeta encode", global, encode);
  },

  plot({global, plot}: IVegetaPlotConfig={}){
    return renderCommand("vegeta plot", global, plot);
  },

  report({global, report}: IVegetaReportConfig={}){
    return renderCommand("vegeta report", global, report);
  }
}

function renderCommand(command: string, globalConfig?: IVegetaGlobalOptions, options?: any, arg?: any) {
  return setArg(setOptions(setOptions(command, globalConfig), options), arg);
}

function setOptions(command: string, options?: any){;
  if(options){
    return Object.entries(options).reduce((acc, [key, value]) => {
      const paramCasedKey = paramCase(key);
      if(value instanceof Boolean) {
        return `${acc} -${paramCasedKey}`;
      } else {
        return `${acc} -${paramCasedKey}=${JSON.stringify(value)}`;
      }
    }, command);
  }else{
    return command;
  }
}

function setArg(command:string, arg?:string){
  if(arg){
    return `echo '${arg}' | ${command}`;
  }else{
    return command;
  }
}