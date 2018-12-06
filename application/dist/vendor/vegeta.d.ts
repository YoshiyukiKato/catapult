export interface IVegetaTarget {
    body?: string;
    header?: {
        [key: string]: string[];
    };
    method: string;
    url: string;
}
