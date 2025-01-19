export enum DappType {
  DAPP = 1,
  SMART_CONTRACT = 2,
  FRAME = 3,
  APP_USER = 4,
  GROUP = 5,
}
export interface DappDomain {
  id: number;
  name: string;
  type: DappType;
  logo: string;
  url: string;
}
export interface IDappCreatedDE extends DappDomain {}
