/**
 * vegeta config schema
 * https://github.com/tsenart/vegeta
 * https://github.com/tsenart/vegeta/blob/master/lib/target.schema.json
 */
export interface IVegetaTarget {
  body?: string;
  header?: {
    [key: string]: string[]
  };
  method: string;
  url: string;
}

export interface IVegetaGlobalOptions {
  cpus?: number;
  profile?: "cpu"|"heap";
}

export interface IVegetaAttackOptions {
  body?: string;
  cert?: string;
  conection?: number;
  duration?: string;
  format?: string;
  h2c?: boolean;
  header?: string;
  http2?: boolean;
  insecure?: boolean;
  keepalive?: boolean;
  key?: string;
  laddr?: string;
  lazy?: boolean;
  maxBody?: string;
  name?: string;
  output?: string;
  rate?: string;
  redirects?: number;
  resolvers?: string;
  rootCerts?: string;
  targets?: string;
  timeout?: string;
  workers?: number;
}

export interface IVegetaEncodeOptions {
  output?: string;
  to?: string;
}

export interface IVegetaPlotOptions {
  output?: string;
  threshold?: number;
  title?: string;
}

export interface IVegetaReportOptions {
  every?: number;
  output?: string;
  type?: string;
}
