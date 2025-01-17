export enum DappType {
  DAPP = 1,
  SMART_CONTRACT = 2,
  FRAME = 3,
  APP_USER = 4,
  GROUP = 5,
}

export interface DappDomain {
  id?: number;
  type: DappType;
  name: string;
  logo: string;
  url: string;
}

export interface CreateDappProps extends DappDomain {}
export interface DappResponse {
  id: number;
  type: DappType;
  name: string;
  logo: string;
  url: string;
}
