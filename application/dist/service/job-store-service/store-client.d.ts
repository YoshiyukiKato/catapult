export declare class StoreClient<Store> {
    private namespace;
    constructor(namespace: string);
    all(): Promise<Store[]>;
    get(itemId: string): Promise<Store>;
    set(itemId: string, store: Store): Promise<number>;
    del(itemId: string): Promise<number>;
}
