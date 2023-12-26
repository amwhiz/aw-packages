/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { StatusCode } from './enums/status-code';
import { ResponseType } from './types/response';

// For More References Check https://axios-http.com/
class Http {
  private instance: AxiosInstance | null = null;
  private headers: Readonly<Record<string, string | boolean>> = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  private get http(): AxiosInstance {
    return this.instance ?? this.initHttp();
  }

  initHttp(): AxiosInstance {
    const http = axios.create({
      baseURL: 'https://api.example.com',
      headers: this.headers,
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    this.instance = http;
    return http;
  }

  setHeaders(newHeaders: RawAxiosRequestHeaders | AxiosHeaders): void {
    this.headers = { ...this.headers, ...newHeaders } as any;
    this.instance = null; // Reset instance to apply new headers
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private handleError(error: any): ResponseType {
    if (!error?.status) return { statusCode: StatusCode.InternalServerError, error: 'Something went wrong, Please try again later' };
    const { status } = error;
    return {
      statusCode: status,
      error: error?.data,
    };
  }
}

export const axiosClient = new Http();
