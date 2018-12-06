export declare class JobExecClient {
    requestExec(job: any): Promise<number>;
    startListenExecRequest(): Promise<string>;
    stopListenExecRequest(): Promise<string>;
    responseExec(result: any): Promise<number>;
    startListenExecResponse(): Promise<string>;
    stopListenExecResponse(): Promise<string>;
}
export declare const jobExecClient: JobExecClient;
