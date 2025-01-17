export interface DappProps {
  id: number;
  type: DappType;
  name: string;
  logo: string;
  url: string;
}

export enum DappType {
  DAPP = 1,
  SMART_CONTRACT = 2,
  FRAME = 3,
  APP_USER = 4,
  GROUP = 5,
}
