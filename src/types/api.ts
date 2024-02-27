import { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface CustomInstance extends AxiosInstance {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

export type CustomResponseType<T = unknown> = {
  status: number;
  data?: T;
};

export interface ErrorDataType {
  success: boolean;
  error: {
    errorCode: string;
    message: string;
  };
}
