import {IJob} from "../../lib/model";
import {StoreClient} from "./store-client";
export const jobStoreClient = new StoreClient<IJob>("job-store");