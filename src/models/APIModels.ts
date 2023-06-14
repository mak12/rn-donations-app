export interface ICurrency {
  id: string;
  symbol: string;
}

export interface IPrice {
  currency: ICurrency;
  amount: number;
  text: string;
}

export interface IStatus {
  id: string;
  name: string;
}

export interface IReferenceType {
  id: string;
  prefix: string;
}

export interface IReference {
  type: IReferenceType;
  number: number;
  text: string;
}

export interface ILocation {
  id: string;
  name: string;
}

export interface ITheme {
  id: string;
  name: string;
}

export interface IDonationsResponse {
  id: string;
  reference: IReference;
  name: string;
  location: ILocation;
  theme?: ITheme;
  price?: IPrice;
  status: IStatus;
}
