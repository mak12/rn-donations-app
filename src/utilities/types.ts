export enum APP_SCREEN {
  LOGIN = 'Login',
  HOME = 'Home',
  ADD_DONATION = 'Add_Donation',
}

export type AuthStackParamList = {
  [APP_SCREEN.LOGIN]: undefined;
};

export type HomeStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.ADD_DONATION]: undefined;
};

export enum APIStatus {
  IDLE,
  PENDING,
  REJECTED,
  FULFILLED,
}

export type APIError = {
  message: string;
  code: number;
};

export type APIResponse<DataType = any> = {
  status: APIStatus;
  error?: APIError;
  data?: DataType;
};

export interface Map {
  [key: string]: string | number | undefined;
}

export interface NullableMap {
  [key: string]: string | number | undefined | null;
}
