import {exec} from "child_process";

export async function execAsync(command: string): Promise<{ stdout:string, stderr: string }> {
  return new Promise<{ stdout:string, stderr: string }>((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if(err){
        reject(err);
      }
      resolve({ stdout: stdout, stderr: stderr });
    });
  });
}