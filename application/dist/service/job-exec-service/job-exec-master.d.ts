export declare class JobExecMaster {
    private findJobRunnable;
    private requestExec;
    private watchJobRunnable;
    private startListenExecResponse;
    startWorker(): Promise<void>;
}
